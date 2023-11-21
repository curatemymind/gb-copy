import React, { useEffect, useState } from "react";
import "../../App.css";
import { ConnectKitButton, getDefaultClient } from "connectkit";

import { ConnectKitProvider } from "connectkit";
import { WagmiConfig, useAccount, createClient, useSigner } from "wagmi";

const Header  = (props: any) => {
  const { address, isConnecting, isDisconnected } = useAccount()

  useEffect(() => {}, []);


  return (
    <div id="header" className="absolute top-0 pt-4">
    
        
      <ConnectKitButton.Custom>
            {({
              isConnecting,
              show,
              hide,
              truncatedAddress,
              address,
              ensName,
            }) => {
              return (
                <div className={`${!props.mobile ? 'w-[100vw]  xl:text-[5rem] lg:text-[5rem] md:text-[5rem] sm:text-[5rem]' : 'w-[100vw]  xl:text-[3rem] lg:text-[3rem] md:text-[3rem] sm:text-[3rem] xs:text-[2rem]'}`}>
                  
               
               <div className="pl-4 float-left flex flex-row">
                {!props.muted ? <svg id="volumeButton" className="" onClick={props.toggleMuted} role="button" width={!props.mobile ? '70' : '40'} height="auto" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M28.4818 15.5185C32.0616 19.0983 32.0616 24.9024 28.4818 28.4822M33.6674 10.333C40.111 16.7766 40.111 27.2238 33.6674 33.6675M10.2406 27.5004H7.33333C6.32081 27.5004 5.5 26.6796 5.5 25.6671V18.3338C5.5 17.3212 6.32081 16.5004 7.33333 16.5004H10.2406L18.8703 7.87072C20.0252 6.71579 22 7.53376 22 9.16709V34.8338C22 36.4671 20.0252 37.2851 18.8703 36.1301L10.2406 27.5004Z" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
:
                  <svg id="volumeButton" viewBox="0 0 44 44" role="button" onClick={props.toggleMuted} width={!props.mobile ? '70' : '40'} height="auto" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M28.4818 15.5185C32.0616 19.0983 32.0616 24.9024 28.4818 28.4822M33.6674 10.333C40.111 16.7766 40.111 27.2238 33.6674 33.6675M10.2406 27.5004H7.33333C6.32081 27.5004 5.5 26.6796 5.5 25.6671V18.3338C5.5 17.3212 6.32081 16.5004 7.33333 16.5004H10.2406L18.8703 7.87072C20.0252 6.71579 22 7.53376 22 9.16709V34.8338C22 36.4671 20.0252 37.2851 18.8703 36.1301L10.2406 27.5004Z" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                    <rect x="5.53516" y="39.9863" width="5" height="48.7213" transform="rotate(-135 5.53516 39.9863)" fill="#FFFEFE"/>
                    </svg>}

                 
                <span className="w-[.4rem] block"></span>
                  {!props.playing ? <svg className={!props.mobile ? "pt-2" : 'pt-1'} id="playButton" onClick={props.toggle} role="button" width={!props.mobile ? '38' : '21'} height="auto" viewBox="0 0 71 97" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M64.8751 46.1152C66.4484 47.3158 66.4483 49.6842 64.8751 50.8848L7.57002 94.618C5.59559 96.1248 2.75 94.7169 2.75 92.2331L2.75 4.76685C2.75 2.28313 5.5956 0.875199 7.57003 2.38201L64.8751 46.1152Z" fill="white"/>
                  </svg>
:
                  <svg className={!props.mobile ? "pt-2" : 'pt-1'} id="pauseButton" onClick={props.toggle} role="button" width={!props.mobile ? '38' : '21'} height="auto" viewBox="0 0 71 97" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="4" width="17" height="97" rx="3" fill="white"/>
<rect x="51" width="17" height="97" rx="3" fill="white"/>
</svg>}


       
              </div>


                  {(!isDisconnected && !isConnecting)  &&
                    <h1 className="text-white bg-transparent lg:inline-block md:inline-block sm:block float-right">
                    
                    <span className="text-white pr-4" id="wallet" role="button" onClick={show}>{truncatedAddress}</span>
                    
                  </h1>
                  }
                </div>
              );
            }}
          </ConnectKitButton.Custom>
          </div>

      

  );
};
export default Header;
