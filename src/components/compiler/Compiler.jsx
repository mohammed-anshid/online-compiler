import React, {useEffect, useState} from 'react';
import SplitPane from 'react-split-pane';
import axios from 'axios';
import CodeMirror from '@uiw/react-codemirror';
import { githubLight, githubDark } from '@uiw/codemirror-theme-github';
import { javascript } from '@codemirror/lang-javascript';
import OutputWindow from '../OutputWindow';
import { useParams } from 'react-router-dom';
import { codeStrings } from '..';

const Compiler = () => {
    const [code, setCode] = useState('')
    const [outputDetails, setOutputDetails] = useState(null);
    const{ id } = useParams()
    console.log(id,'codedeee')

    useEffect(() => {
        const string = codeStrings.find(item => item.id == id);
        console.log('codeStrings:', codeStrings);
        console.log('Found Code:', string);
        setCode(string?.codeString);
      }, [id, codeStrings]);
      
    
    const handleCompile = () => {
        const formData = {
            language_id: 63,
            source_code: btoa(code),
        };

        const options = {
            method: "POST",
            url: 'https://judge0-ce.p.rapidapi.com/submissions',
            params: { base64_encoded: "true", fields: "*" },
            headers: {
                "content-type": "application/json",
                "Content-Type": "application/json",
                "X-RapidAPI-Host": 'judge0-ce.p.rapidapi.com',
                "X-RapidAPI-Key": 'def3f9d92fmsh286ee8634f2f25bp162287jsn0d5fbed5e607',
            },
            data: formData,
        };

        console.log("Request options:", options);

        axios
            .request(options)
            .then(function (response) {
                console.log("Response data:", response.data);
                const token = response.data.token;
                console.log("Token:", token);
                checkStatus(token);
            })
            .catch((err) => {
                let error = err.response ? err.response.data : err;
                console.error("Error:", error);
            });
    };


    const checkStatus = async (token) => {
        const options = {
          method: "GET",
          url: `https://judge0-ce.p.rapidapi.com/submissions` + "/" + token,
          params: { base64_encoded: "true", fields: "*" },
          headers: {
            "X-RapidAPI-Host": 'judge0-ce.p.rapidapi.com',
            "X-RapidAPI-Key": 'def3f9d92fmsh286ee8634f2f25bp162287jsn0d5fbed5e607',
          },
        };
        try {
          let response = await axios.request(options);
          let statusId = response.data.status?.id;
    
          // Processed - we have a result
          if (statusId === 1 || statusId === 2) {
            // still processing
            setTimeout(() => {
              checkStatus(token);
            }, 2000);
            return;
          } else {
            // setProcessing(false);
            setOutputDetails(response.data);
            // showSuccessToast(`Compiled Successfully!`);
            console.log("response.data", response.data);
            return;
          }
        } catch (err) {
          console.log("err", err);
        //   setProcessing(false);
        //   showErrorToast();
        }
    };

    console.log(outputDetails,'response')
  return (
    <div>
        <button onClick={handleCompile} className='w-36 h-11 m-3 text-white bg-green-500 rounded-md'>Run</button>
        <div className='w-full h-full flex flex-col items-start justify-start overflow-hidden '>
            
            <SplitPane 
                split='vertical'
                defaultSize="50%"
            >
                {/* Content for Code */}
                <div className='text-start bg-[#0d1117]  h-full w-full px-1 overflow-y-auto'>
                    <CodeMirror
                        value={code}
                        onChange={(value, viewUpdate)=>setCode(value)}
                        theme={githubDark}
                        extensions={[javascript({ jsx: true })]}
                    />
                </div>

                {/* Content for Output */}
                <div>
                    {/* Your content for the right side goes here */}
                    <OutputWindow outputDetails={outputDetails}/>
                    <div className="mt-4 flex flex-col space-y-3 p-4">
                        <p className="text-sm">
                            Status:{" "}
                            <span className="font-semibold px-2 py-1 rounded-md bg-gray-100">
                            {outputDetails?.status?.description}
                            </span>
                        </p>
                        <p className="text-sm">
                            Memory:{" "}
                            <span className="font-semibold px-2 py-1 rounded-md bg-gray-100">
                            {outputDetails?.memory}
                            </span>
                        </p>
                        <p className="text-sm">
                            Time:{" "}
                            <span className="font-semibold px-2 py-1 rounded-md bg-gray-100">
                            {outputDetails?.time}
                            </span>
                        </p>
                    </div>
                </div>
            </SplitPane>
        </div>
        
    </div>
  )
}

export default Compiler