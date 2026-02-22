import React, { useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import prettier from 'prettier/standalone';
import parserHtml from 'prettier/plugins/html';
import parserCss from 'prettier/plugins/postcss';
import parserBabel from 'prettier/plugins/babel';
import estree from 'prettier/plugins/estree';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { FaDownload, FaMagic, FaEllipsisV } from 'react-icons/fa';

export default function CodeEditor({ initialCode, onRun }) {
    const [html, setHtml] = useState(initialCode.html || '');
    const [css, setCss] = useState(initialCode.css || '');
    const [js, setJs] = useState(initialCode.js || '');

    const [activeTab, setActiveTab] = useState('html');
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        setHtml(initialCode.html || '');
        setCss(initialCode.css || '');
        setJs(initialCode.js || '');
    }, [initialCode]);

    const handleRun = () => {
        onRun({ html, css, js });
    };

    const handleFormat = async () => {
        try {
            if (activeTab === 'html') {
                const formatted = await prettier.format(html, {
                    parser: 'html',
                    plugins: [parserHtml, parserCss, parserBabel],
                });
                setHtml(formatted);
            } else if (activeTab === 'css') {
                const formatted = await prettier.format(css, {
                    parser: 'css',
                    plugins: [parserCss],
                });
                setCss(formatted);
            } else if (activeTab === 'js') {
                const formatted = await prettier.format(js, {
                    parser: 'babel',
                    plugins: [parserBabel, estree],
                });
                setJs(formatted);
            }
        } catch (error) {
            console.error("Formatting error:", error);
            alert("Could not format code. Check for syntax errors.");
        }
        setIsMenuOpen(false);
    };

    const handleDownload = (e) => {
        try {
            const zip = new JSZip();

            // Ensure index.html connects the css and js
            let finalHtml = html;
            if (!finalHtml.includes('<style>')) {
                finalHtml = `<!DOCTYPE html>\n<html lang="en">\n<head>\n    <meta charset="UTF-8">\n    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n    <title>Exported Project</title>\n    <link rel="stylesheet" href="style.css">\n</head>\n<body>\n${html}\n    <script src="script.js"></script>\n</body>\n</html>`;
            } else {
                finalHtml = `<!DOCTYPE html>\n<html lang="en">\n<head>\n    <meta charset="UTF-8">\n    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n    <title>Exported Project</title>\n    <link rel="stylesheet" href="style.css">\n</head>\n<body>\n${html}\n    <script src="script.js"></script>\n</body>\n</html>`;
            }

            zip.file("index.html", finalHtml);
            zip.file("style.css", css);
            zip.file("script.js", js);

            zip.generateAsync({ type: "blob" })
                .then(function (content) {
                    saveAs(content, "webdevlearn-project.zip");
                })
                .catch(function (error) {
                    console.error("ZIP Generation Error: ", error);
                    alert("Failed to generate zip file.");
                });
        } catch (error) {
            console.error("Download Error: ", error);
            alert("An error occurred while downloading.");
        }
        setIsMenuOpen(false);
    };

    const renderActiveEditor = () => {
        let language = 'html';
        let value = html;
        let onChange = setHtml;

        if (activeTab === 'css') {
            language = 'css';
            value = css;
            onChange = setCss;
        } else if (activeTab === 'js') {
            language = 'javascript';
            value = js;
            onChange = setJs;
        }

        return (
            <Editor
                height="100%"
                language={language}
                theme="vs-dark"
                value={value}
                onChange={(val) => onChange(val)}
                options={{
                    minimap: { enabled: false },
                    fontSize: 14,
                    wordWrap: 'on',
                }}
            />
        );
    };

    return (
        <div className="flex flex-col h-full bg-dark-bg border border-slate-700 rounded-lg overflow-hidden">
            <div className="flex justify-between items-center bg-slate-800 px-4 py-2 border-b border-slate-700">
                <div className="flex space-x-2">
                    <button
                        onClick={() => setActiveTab('html')}
                        className={`px-3 py-1 text-sm rounded-md ${activeTab === 'html' ? 'bg-primary-600 text-white' : 'text-slate-300 hover:bg-slate-700'}`}
                    >
                        HTML
                    </button>
                    <button
                        onClick={() => setActiveTab('css')}
                        className={`px-3 py-1 text-sm rounded-md ${activeTab === 'css' ? 'bg-secondary-600 text-white' : 'text-slate-300 hover:bg-slate-700'}`}
                    >
                        CSS
                    </button>
                    <button
                        onClick={() => setActiveTab('js')}
                        className={`px-3 py-1 text-sm rounded-md ${activeTab === 'js' ? 'bg-yellow-600 text-white' : 'text-slate-300 hover:bg-slate-700'}`}
                    >
                        JS
                    </button>
                </div>
                <div className="flex space-x-2 relative flex-row-reverse items-center justify-end">
                    <div className="relative ml-2">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="text-slate-300 hover:text-white hover:bg-slate-700 p-2 rounded-md transition-colors"
                            title="More Options"
                        >
                            <FaEllipsisV />
                        </button>

                        {isMenuOpen && (
                            <div className="absolute right-0 top-full mt-2 w-48 bg-slate-800 border border-slate-700 rounded-md shadow-xl z-50">
                                <div className="py-1">
                                    <button
                                        onClick={handleFormat}
                                        className="w-full text-left px-4 py-2 text-sm text-slate-300 hover:bg-slate-700 hover:text-white flex items-center"
                                    >
                                        <FaMagic className="mr-3" /> Format Code
                                    </button>
                                    <button
                                        onClick={handleDownload}
                                        className="w-full text-left px-4 py-2 text-sm text-slate-300 hover:bg-slate-700 hover:text-white flex items-center"
                                    >
                                        <FaDownload className="mr-3" /> Download .zip
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    <button
                        onClick={handleRun}
                        className="bg-green-600 hover:bg-green-700 text-white text-sm px-4 py-1.5 rounded flex items-center shadow-sm"
                    >
                        Run Code
                    </button>
                </div>
            </div>
            <div className="flex-grow">
                {renderActiveEditor()}
            </div>
        </div>
    );
}
