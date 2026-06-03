import React, { useEffect } from 'react';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-tsx';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-yaml';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-sql';
import 'prismjs/components/prism-csharp';
import type { SkillCodePreview } from '../../models/DevelopmentSkills';

interface Props {
    snippet?: SkillCodePreview;
    emptyText?: string;
}

export const ChunkyCodeBlock: React.FC<Props> = ({ snippet, emptyText = "// No code provided" }) => {
    useEffect(() => {
        if (snippet?.code) {
            Prism.highlightAll();
        }
    }, [snippet]);

    const languageClass = snippet?.language 
        ? `language-${snippet.language.toLowerCase()}` 
        : 'language-javascript';

    return (
        <div className="bg-slate-900/90 backdrop-blur-md rounded-xl p-4 h-full w-full overflow-y-auto custom-scrollbar relative group flex flex-col hover:shadow-[0_0_15px_rgba(56,189,248,0.3)] transition-shadow duration-300 border-2 border-slate-700/50 hover:border-sky-400/50">
            {/* Decorative dots */}
            <div className="absolute top-3 left-3 flex gap-1.5 opacity-50 group-hover:opacity-100 transition-opacity z-10">
                <div className="w-2.5 h-2.5 rounded-full bg-rose-500 hover:scale-150 transition-transform"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500 hover:scale-150 transition-transform"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 hover:scale-150 transition-transform"></div>
            </div>
            
            <div className="absolute top-2 right-2 bg-sky-500/20 text-sky-300 text-[10px] px-2 py-0.5 rounded font-black uppercase tracking-wider z-10 group-hover:bg-sky-500 group-hover:text-slate-900 transition-colors duration-300">
                {snippet ? snippet.language : 'CODE'}
            </div>
            
            {snippet?.name && (
                <div className="mt-4 text-sky-400 font-bold mb-1 text-sm mr-12 truncate group-hover:text-emerald-400 transition-colors">
                    {snippet.name}
                </div>
            )}
            {snippet?.specialty && (
                <div className="text-purple-400/70 text-[10px] mb-2 font-medium uppercase tracking-widest flex items-center gap-2">
                    <span className="w-1 h-1 bg-purple-500 rounded-full animate-pulse"></span>
                    {snippet.specialty}
                </div>
            )}
            <div className="flex-1 mt-2 relative min-w-0">
                {/* Random decorative hover element */}
                <div className="absolute -left-2 top-1/2 w-1 h-0 bg-sky-400 group-hover:h-3/4 group-hover:-translate-y-1/2 transition-all duration-500 rounded-full opacity-0 group-hover:opacity-100 z-10"></div>
                
                {snippet?.code ? (
                    /* SỬA TẠI ĐÂY: Thêm custom-scrollbar, overflow-x-auto và đổi wrap */
                    <pre className={`text-[8px] font-mono whitespace-pre overflow-x-auto custom-scrollbar leading-relaxed !bg-transparent !p-0 !m-0 pb-2 ${languageClass}`}>
                        <code className={languageClass}>{snippet.code.trim()}</code>
                    </pre>
                ) : (
                    <div className="flex items-center justify-center h-full text-slate-500 font-mono italic text-sm group-hover:animate-bounce">
                        {emptyText}
                    </div>
                )}
            </div>
        </div>
    );
};