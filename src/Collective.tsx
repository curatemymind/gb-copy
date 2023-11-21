import React, { useEffect, useState } from "react";
import GhostLogo from "./svgs/GhostListIcon copy";

import { trackAmplitude } from "./utilities/amplitude";
import Tag from './components/Tag'






interface ComponentProps {}

const Collective: React.FC<ComponentProps> = (props: ComponentProps) => {
  const [mobile, setMobile] = useState(false);
  const [processed, setProcessed] = useState(false);
  const [fileName, setFileName] = useState("select a file")
  const [text, setText] = useState("submit")

  const usernames = ["evanluza","curatemymind", "messagehash", "hashmonke", "atownbrown"]

  const form = document.querySelector('form');
  

  const [file, setFile] = useState(null)

  var valid = true;

  const handleSubmit = async (event:any ) => {
    event.preventDefault()

    const formData = new FormData()
    if(file !== null)
    {
      formData.append('username', event.target.username.value)
      formData.append('wallet', event.target.wallet.value)
      formData.append('link', event.target.link.value)
      formData.append('file', file)
    }
    else
    {
      if(event.target.link.value !== "")
      {
        formData.append('username', event.target.username.value)
        formData.append('wallet', event.target.wallet.value)
        formData.append('link', event.target.link.value)
        formData.append('file', "")
      }
      else
      {
        valid = false;
        alert("you need to submit either a file or a link. Try again!")
      }
    }
   
  

   if(valid) { try {

    setText("processing...")

      const response = await fetch('/api/submit', {
        method: 'POST',
        body: formData,

      })

      const data = await response.json()
      
      if(data.successful)
      {
        setProcessed(true)
      }
      else
      {

        alert("there was an error submitting your file. please try again.")
        setText("submit")
      }
    } catch (error) {
      alert("there was an error submitting your file. please try again.")
      setText("submit")
    }
  

  }

  valid = true;
}

  const handleFileChange = (event: any) => {
    setFile(event.target.files[0])

    var name = event.target.value.split(/(\\|\/)/g).pop()

    if(name === null || name === "")
    {
      setFileName("select a file")
    }
    else
    {
      setFileName(event.target.value.split(/(\\|\/)/g).pop())
    }
    

    //setFileName(event.target)
  }



  
  useEffect(() => {
    //trackAmplitude("navigate-to-playground");
    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
    ) {
      setMobile(true);
    }

    document
      .getElementById("start")
      ?.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });

   
  }, []);

  useEffect(() => {}, []);

  return (
    <div className="xl:max-w-[1100px] m-auto bg-transparent " >
        <div>

            <div className="w-[50%] mt-8 m-auto" role="button" onClick={() => window.location.replace("/")}>
                <GhostLogo/>
            </div>

           <div className="flex xl:flex-row lg:flex-row md:flex-row sm:flex-col mt-8">
            

           {!processed ?     <div className="xl:w-[60%] lg:w-[60%] md:w-[60%] sm:w-[100%] xl:pl-[2%] lg:pl-[2%] md:pl-[2%] sm:pl-[0%] block">
                
                <div className=" xl:text-[20px] lg:text-[20px] md:text-[17px] sm:text-[18x] xl:w-[90%] lg:w-[75%] md:w-[75%] sm:w-[90%] m-auto">
                    <div className="collective"> <span className="collective text-center w-full block">GHOST BOY COLLECTIVE</span>
                    <br></br>
                    Ghost Boy represents the celebration of life through creative expression. Death comes for us all, but what marks will we leave behind until then? Ghost Boy Collective celebrates, promotes and encourages collaborative creation with artists around the world.
                    <br></br>
                    <br></br>
                    The aim and ethos of the Ghost Boy brand and collective is to encourage, challenge and inspire creators in all forms.
                    <br></br>
                    <br></br>
                    Ghost Boy is more than an art collection, it&#x2019;s a movement and reminder to us all to channel our inner creative, and share our creations.
                    </div>
                    </div>
                    <br></br>
                    <br></br>
  <form  onSubmit={handleSubmit} className= " xl:w-[90%] lg:w-[75%] md:w-[75%] sm:w-[90%] m-auto">
      <input id="username" required name="username" className="collective w-full border-2 border-grayOutline bg-grayFill rounded-full text-center mb-4 pt-2 pb-2 hover:bg-grayHover hover:bg-opacity-80" type="text" placeholder="your twitter handle"></input>
      <input id="wallet" required name="wallet" className="collective w-full border-2 border-grayOutline bg-grayFill rounded-full text-center mb-4 pt-2 pb-2 hover:bg-grayHover hover:bg-opacity-80" type="text" placeholder="wallet"></input>
      <input id="link" name="link" className="collective w-full border-2 border-grayOutline bg-grayFill rounded-full text-center mb-4 pt-2 pb-2 hover:bg-grayHover hover:bg-opacity-80" type="text" placeholder="link"></input>
 
      <input id="file" onChange={(e) => {handleFileChange(e)}} name="file" className="hidden collective w-full border-2 border-grayOutline bg-grayFill rounded-full placeholder-blacktext-center pt-2 pb-2 pl-6 hover:bg-grayHover hover:bg-opacity-80" type="file" ></input>
      <label htmlFor="file" className="collective block w-full border-2 border-grayOutline bg-grayFill rounded-full text-center mb-4 pt-3 pb-3 hover:bg-grayHover hover:bg-opacity-80">{fileName}</label>
      <p className="mt-1 text-gray-500 mb-4 xl:text-[15px] lg:text-[15px] md:text-[12px] sm:text-[13px]" id="file_input_help"><div className="collective">required: one FILE or LINK</div></p>
      <p className="mt-1 text-gray-500 mb-4 xl:text-[15px] lg:text-[15px] md:text-[12px] sm:text-[13px]" id="file_input_help"><div className="collective">max file size: 4.5 MB - consider compressing your file or uploading a link if the submission fails</div></p>
  
  
      <span className="block mt-4"></span>
      <button className="xl:text-[38px] lg:text-[33px] md:text-[27px] sm:text-[28px] w-[40%] m-auto rounded-full text-center bg-ghostBlue ml-[30%] pt-4 pb-4 mb-8 hover:bg-grayHover hover:bg-opacity-80" type="submit">{text}</button>
      
  </form>
                </div> : 
                <div className="xl:w-[60%] lg:w-[60%] md:w-[60%] sm:w-[100%] xl:pl-[2%] lg:pl-[2%] md:pl-[2%] sm:pl-[0%] block">
                
                <div className="collective xl:text-[20px] lg:text-[20px] md:text-[17px] sm:text-[18x] xl:w-[90%] lg:w-[75%] md:w-[75%] sm:w-[90%] m-auto flex items-center justify-center">
                <span className="collective text-center w-full block mt-10 mb-10"> Thank you for your submission to the create or die contest!<br></br><br></br><a className="collective underline" href="https://twitter.com/intent/tweet?url=https%3A%2F%2Fghostboy.rip%2Fcreateordie&via=ghostboylives&text=I%20just%20submitted%20my%20entry%20into%20the%20Create%20or%20Die%20contest%21%20&hashtags=ghostboylives" target="_blank">Share to Twitter</a></span>
                 
                   
                    </div></div>}



                <div className="xl:w-[40%] lg:w-[40%] md:w-[40%] sm:w-[100%] xl:pr-[2%] xl:pl-[0%] lg:pr-[2%] lg:pl-[0%] md:pr-[2%] md:pl-[0%] sm:pr-[5%] sm:pl-[5%] block">
                    <div className="h-auto overflow w-[80%] border-2 border-black m-auto">
                      <div className="h-[auto]">
                      <div className="xl:text-[38px] lg:text-[33px] md:text-[27px] sm:text-[28px] m-auto">
                      
                       <div className="w-ful max-h-[800px] overflow-scroll block flex flex-col">
                        <div>
                        <span className="mt-2 w-full text-center block">
                       Ghosties on Twitter
                       </span>
                         
                          <div className="w-[90%] m-auto">
                          
                           {usernames.map((i, index) => <Tag username={usernames[index] } key={index}></Tag>)}
                          </div>

                        </div>

                        <span className="mb-2 w-full block">
                       
                       </span>
            
                      </div>
                      </div>
                      </div>
                    </div>
                </div>
            </div>
            
            </div>
            <span className="mb-4 w-full block">
                       
                       </span>
            
    </div>
  );
};

export default Collective;
