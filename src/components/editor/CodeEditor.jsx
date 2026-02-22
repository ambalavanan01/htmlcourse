import React, { useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';

export default function CodeEditor({ initialCode, onRun }) {
    const [html, setHtml] = useState(initialCode.html || '');
    const [css, setCss] = useState(initialCode.css || '');
    const [js, setJs] = useState(initialCode.js || '');

    const [activeTab, setActiveTab] = useState('html');

    useEffect(() => {
        setHtml(initialCode.html || '');
        setCss(initialCode.css || '');
        setJs(initialCode.js || '');
    }, [initialCode]);

    const handleRun = () => {
        onRun({ html, css, js });
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
                <button
                    onClick={handleRun}
                    className="bg-green-600 hover:bg-green-700 text-white text-sm px-4 py-1.5 rounded flex items-center shadow-sm"
                >
                    Run Code
                </button>
            </div>
            <div className="flex-grow">
                {renderActiveEditor()}
            </div>
        </div>
    );
}
