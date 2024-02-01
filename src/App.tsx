import LZUTF8 from 'lzutf8';
import { FC, useState } from 'react';

import './style.css';

export const App: FC<{ name: string }> = ({ name }) => {
  const [encodedStr, SetEncodedStr] = useState<string>()
  const [decodedStr, SetDecodedStr] = useState<string>()
  const [errorMsg, setErrorMsg] = useState<string>()
  const [json, setJSON] = useState(true)
  const onEncode = () => {
    setErrorMsg('')
    try{
      let compressedStr = ''
      if(json){
        compressedStr = LZUTF8.compress((JSON.stringify(JSON.parse(decodedStr))), {
          outputEncoding: 'Base64',
        })
      } else {
        compressedStr = LZUTF8.compress((decodedStr), {
          outputEncoding: 'Base64',
        })
      }
      
      SetEncodedStr(compressedStr)
    }catch(e){
      console.error(e)
      setErrorMsg(`Encoding Error: ${e.message}`)
    }
  }
  const onDecode = () => {
    setErrorMsg('')
    try{
      let decompressedStr = ''
      if(json){
        decompressedStr = JSON.stringify(JSON.parse(LZUTF8.decompress(encodedStr, {
          inputEncoding: 'Base64',
        })), undefined, 4)
      } else {
        decompressedStr = LZUTF8.decompress(encodedStr, {
          inputEncoding: 'Base64',
        })
      }
      
      SetDecodedStr(decompressedStr)
    }catch(e){
      console.error(e)
      setErrorMsg(`Decoding Error: ${e.message}`)
    }
  }
  return (
    <div>
      <h1>LZ UTF-8 Encoding/Decoding Playground (with compresssion)</h1>
      <div className="playground">
        <textarea value={decodedStr} onChange={e => SetDecodedStr(e.target.value)} />
        <div className="action-buttons">
          <button onClick={onEncode}>Encode {json ? 'JSON' : null} &mdash;&rarr;</button>
          <button onClick={onDecode}>&larr;&mdash; Decode {json ? 'JSON' : null}</button>
          <div className='switch-container'>
            <span>JSON: </span>
            <label className="switch">
              <input type="checkbox" checked={json} onChange={e => setJSON(!json)} />
              <span className="slider round"></span>
            </label>
          </div>
        </div>
        <textarea value={encodedStr} onChange={e => SetEncodedStr(e.target.value)} />
      </div>
      {errorMsg ? <p className="error">{errorMsg}</p> : null}
    </div>
  );
};
