import React, { useContext } from 'react';
import './Main.css';
import {assets} from '../../assets/assets';
import { Context } from '../../context/Context';

const Main = () =>{

    const {onSent,recentPrompt,showResult,loading,resultData,setInput,input} = useContext(Context);

    return(
        <div className='main'>
            <div className='nav'>
                <p>Vepp</p>
                <img src={assets.user_icon} alt='user icon'/>
            </div>
            <div className='main-container'>

                {!showResult?
                    <>                        
                <div className='greet'>
                    <p><span>Hello, Master.</span></p>
                    <p>How can I help you today?</p>
                </div>
                <div className='cards'>
                    <div className='card'>
                        <p>Suggest beautiful places to see on an upcoming road trip</p>
                        <img src={assets.compass_icon} alt='compass icon'/>
                    </div>
                    <div className='card'>
                        <p>Briefly summarize this concept: urban planning</p>
                        <img src={assets.bulb_icon} alt='bulb icon'/>
                    </div>
                    <div className='card'>
                        <p>Brainstorm team bonding activities for our work retreat</p>
                        <img src={assets.message_icon} alt='message icon'/>
                    </div>
                    <div className='card'>
                        <p>Improve the readability pf the following code</p>
                        <img src={assets.code_icon} alt='code icon'/>
                    </div>
                </div>
                    </>: <div className='result'>
                        <div className="result-title">
                            <img src={assets.user_icon} alt='user icon'/>
                            <p>{recentPrompt}</p>
                        </div>
                        <div className='result-data'>
                            <img src={assets.gemini_icon} alt='gemini icon'/>
                            {loading?
                            <div className='loader'>
                                <hr/>
                                <hr/>
                                <hr/>
                            </div>:
                            <p dangerouslySetInnerHTML={{__html:resultData}}></p>
                            }
                            
                        </div>
                    </div>
                    }

                <div className='main-bottom'>
                    <div className='search-box'>
                        <input onChange={(e)=>{
                            setInput(e.target.value)
                        }} value={input} type='text' placeholder='Enter a prompt here'/>
                        <div>
                            <img src={assets.gallery_icon} alt="gallery icon"/>
                            <img src={assets.mic_icon} alt='mic icon'/>
                            {input?<img onClick={()=>onSent()} src={assets.send_icon} alt='send icon'/>:null}
                        </div>
                    </div>
                    <p className='bottom-info'>
                        Vep is Artificial Inteligence powered by Emilio LLM.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Main;
