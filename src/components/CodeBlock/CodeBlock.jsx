import React, { useState } from 'react'
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { TbCopy } from "react-icons/tb";
import { IoMdCheckmark } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { codeStrings } from '..';

const CodeBlock = () => {

    const [copy,setCopy] = useState(false);
    const naviagte = useNavigate()

    const codeString = `
    const sum = (num1, num2) => num1 + num2;       
    
    // Example usage
    const result = sum(5, 7);
    console.log(result); // Output: 12    
    
    `
    return (
    <div >
        {
            codeStrings.map((item,index)=> {
                return (
                    <div className='grid w-full mt-10'>
                        <div className='max-w-2xl mx-auto min-w-[25rem] bg-[#3a404d] rounded-md overflow-hidden'>
                            <div className='flex justify-between px-4 text-white text-xs items-center'>
                                <p className='text-sm'>Example code</p>

                                { copy ? (
                                    <button className='py-1 inline-flex items-center gap-1 text-sm'>
                                        
                                        <span className='text-xl mt-1'><IoMdCheckmark/></span>
                                        Copied
                                    </button>
                                ) :(
                                    <button className='py-1 inline-flex items-center gap-1 text-sm' onClick={()=>{
                                        navigator.clipboard.writeText(codeString);
                                        setCopy(true);
                                        setTimeout(()=>{
                                            setCopy(false);
                                        },3000)
                                    }}>
                                        <span className='text-xl mt-1'><TbCopy/></span>
                                        Copy
                                    </button>
                                )
                                    
                                }
                            </div>

                            <SyntaxHighlighter 
                                language="javascript" 
                                style={atomOneDark}
                                customStyle={{
                                    padding:'25px'
                                }}
                                wrapLongLines={true}
                            >
                                {item.codeString}
                            </SyntaxHighlighter>
                        </div>
                        <div className='mx-auto'>
                            <button 
                                className='place-items-start bg-green-400 text-white text-lg font-medium w-32 h-11 rounded-md mt-2'
                                onClick={()=>naviagte(`/compiler/${item.id}`)}
                            >
                                Try Out
                            </button>
                        </div>
                    </div>
                )
            })
        }
    </div>
  )
}

export default CodeBlock