import React, { useState, useCallback } from 'react';
import CodeEditor from '../components/editor/CodeEditor';

const defaultCode = {
    html: '',
    css: '',
    js: ''
};

export default function OnlineCompiler() {
    const [output, setOutput] = useState('');

    const handleRunCode = useCallback((code) => {
        let finalHtml = code.html || '';

        // Support both full HTML documents and partial snippets
        if (/<html/i.test(finalHtml) || /<body/i.test(finalHtml) || /<head/i.test(finalHtml)) {
            // Inject CSS into <head> if it exists, otherwise prepend it
            if (/<head/i.test(finalHtml)) {
                finalHtml = finalHtml.replace(/<\/head>/i, `<style>${code.css}</style></head>`);
            } else {
                finalHtml = `<style>${code.css}</style>` + finalHtml;
            }

            // Inject JS before </body> if it exists, otherwise append it
            if (/<body/i.test(finalHtml)) {
                finalHtml = finalHtml.replace(/<\/body>/i, `<script>${code.js}<\/script></body>`);
            } else {
                finalHtml = finalHtml + `<script>${code.js}<\/script>`;
            }
        } else {
            // Wrap partial snippets in a basic HTML structure
            finalHtml = `
                <!DOCTYPE html>
                <html>
                    <head>
                        <style>${code.css}</style>
                    </head>
                    <body>
                        ${finalHtml}
                        <script>${code.js}<\/script>
                    </body>
                </html>
            `;
        }

        setOutput(finalHtml);
    }, []);

    // Run the default code initially
    React.useEffect(() => {
        handleRunCode(defaultCode);
    }, [handleRunCode]);

    return (
        <div className="flex flex-col min-h-[calc(100vh-8rem)] lg:h-[calc(100vh-8rem)]">
            <div className="mb-4">
                <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Online Compiler</h1>
                <p className="text-slate-600 dark:text-slate-400">Practice your HTML, CSS, and JavaScript skills here. Free for all users.</p>
            </div>

            <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6 min-h-0 pb-8 lg:pb-0">
                {/* Editor Panel */}
                <div className="min-h-[450px] lg:min-h-0 lg:h-full flex flex-col">
                    <CodeEditor initialCode={defaultCode} onRun={handleRunCode} livePreview={true} />
                </div>

                {/* Output Panel */}
                <div className="min-h-[450px] lg:min-h-0 lg:h-full flex flex-col bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden flex-1">
                    <div className="bg-slate-100 dark:bg-slate-900 px-4 py-2 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center">
                        <span className="font-medium text-slate-700 dark:text-slate-300">Live Output</span>
                    </div>
                    <div className="flex-grow bg-white relative">
                        <iframe
                            srcDoc={output}
                            title="output"
                            sandbox="allow-scripts allow-modals"
                            className="absolute inset-0 w-full h-full border-none"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
