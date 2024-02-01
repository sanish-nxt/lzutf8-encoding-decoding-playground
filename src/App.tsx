import LZUTF8 from 'lzutf8';
import { FC, useState } from 'react';

import './style.css';

export const App: FC<{ name: string }> = ({ name }) => {
  const [encodedStr, SetEncodedStr] = useState<string>()
  const [decodedStr, SetDecodedStr] = useState<string>()
  const [errorMsg, setErrorMsg] = useState<string>()
  const onEncode = () => {
    setErrorMsg('')
    try{
      const compressedStr = LZUTF8.compress(JSON.stringify(decodedStr), {
        outputEncoding: 'Base64',
      })
      SetEncodedStr(compressedStr)
    }catch(e){
      console.error(e)
      setErrorMsg(`Encoding Error: ${e.message}`)
    }
  }
  const onDecode = () => {
    setErrorMsg('')
    try{
      const decompressedStr = LZUTF8.decompress(encodedStr, {
        inputEncoding: 'Base64',
      })
      SetDecodedStr(decompressedStr.toString())
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
          <button onClick={onEncode}>Encode &mdash;&rarr;</button>
          <button onClick={onDecode}>&larr;&mdash; Decode</button>
        </div>
        <textarea value={encodedStr} onChange={e => SetEncodedStr(e.target.value)} />
      </div>
      {errorMsg ? <p className="error">{errorMsg}</p> : null}
    </div>
  );
};
