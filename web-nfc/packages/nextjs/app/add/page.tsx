"use client";
import React from 'react'
import Editor from "react-simple-code-editor";
import { useEffect, useState } from "react";
import { highlight, languages } from "prismjs/components/prism-core";
export default function page() {
    const [xmlContent, setXmlContent] = useState("");

    function handleXMLChange(newXml) {
        setXmlContent(newXml);
    
        const hasMatch = revealSelectors.some(selector => {
          const searchKey = `<CertificateData><${selector.documentType}`;
    
          if (!newXml.includes(searchKey)) {
            return false;
          }
    
          return true;
        });
      }
    return (
        <div className="w-[390px] h-[876px] bg-[#13120D] flex-col justify-start items-start gap-[31px] inline-flex">
            <div className="self-stretch h-[796.07px] flex-col justify-start items-start gap-11 flex">
                <div className="self-stretch h-[102.07px] px-8 pt-[83px] pb-1 flex-col justify-start items-start gap-2.5 flex" />
                <div className="w-[391px] h-[650px] flex-col justify-start items-center gap-11 flex">
                    <div className="self-stretch h-[650.17px] flex-col justify-center items-center gap-[21.19px] flex">
                        <div className="self-stretch h-[203.78px] flex-col justify-start items-center gap-[32.44px] flex">
                            <div className="self-stretch px-[33.11px] py-[6.62px] justify-start items-center gap-[8.61px] inline-flex">
                                <div className="text-white/90 text-2xl font-medium font-['Clash Display'] leading-normal">New FASTag</div>
                            </div>
                            <div className="w-[323.13px] justify-start items-start gap-[9.93px] inline-flex">
                                <div className="w-[103px] h-[2.50px] bg-white rounded-[11px]" />
                                <div className="w-[103px] h-[2.50px] bg-white rounded-[11px]" />
                                <div className="w-[103px] h-[2.50px] bg-[#AEAFAF] rounded-[11px]" />
                            </div>
                            <div className="self-stretch h-[97.84px] flex-col justify-start items-start flex">
                                <div className="px-[33.11px] py-[6.62px] justify-center items-center gap-[6.62px] inline-flex">
                                    <div className="text-white text-base font-medium font-['Clash Display'] leading-7">Upload  Vehicle Documents</div>
                                </div>
                                <div className="self-stretch px-[33.11px] py-[6.62px] justify-start items-start gap-[6.62px] inline-flex">
                                    <div className="w-[315.18px] text-white/70 text-base font-normal font-['Clash Display'] leading-snug">Please Upload you ID proof Which are updated with latest details</div>
                                </div>
                            </div>
                        </div>
                        <div className="h-[425.20px] flex-col justify-start items-center gap-[26.49px] flex">
                            <div className="self-stretch h-[89.97px] flex-col justify-center items-center gap-[7.28px] flex">
                                <div className="self-stretch grow shrink basis-0 flex-col justify-start items-start flex">
                                    <div className="p-[6.62px] justify-center items-center gap-[6.62px] inline-flex">
                                        <div className="text-white/90 text-sm font-medium font-['Clash Display'] leading-9">Vehicle Number</div>
                                    </div>
                                    <div className="w-[323.12px] h-[39.73px] relative">
                                        <input
                                            type="text"
                                            value="Vehicle Number"
                                            className="w-full text-white py-2 px-4 rounded"
                                            style={{ backgroundColor: "#191919", color: "gray", fontFamily: 'Poppins, sans-serif' }}
                                        />

                                    </div>
                                </div>
                            </div>
                            <div className="self-stretch h-[187.58px] flex-col justify-start items-start gap-[7.28px] flex">
                                <div className="self-stretch h-[187.58px] flex-col justify-start items-center gap-[13.90px] flex">
                                    <div className="self-stretch px-[5.30px] justify-center items-center gap-[6.62px] inline-flex">
                                        <div className="w-[292.67px] text-white text-base font-medium font-['Clash Display'] leading-7">Vehicle ID Proof</div>
                                    </div>
                                    <Editor
                                        value={xmlContent}
                                        onValueChange={code => handleXMLChange(code)}
                                        highlight={code => highlight(code, languages.text)}
                                        padding={10}
                                        style={{
                                            backgroundColor: "#f5f5f5",
                                            fontFamily: '"Fira code", "Fira Mono", monospace',
                                            fontSize: 12,
                                            height: "400px",
                                            width: "90%",
                                            overflowY: "scroll",
                                            marginTop: "10px",
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="self-stretch h-[94.69px] flex-col justify-center items-center gap-[7.28px] flex">
                                <div className="w-[323.79px] h-[43.70px] relative">
                                    <div className="w-[323.79px] h-[43.70px] left-0 top-0 absolute bg-[#F8C43B] rounded-lg" />
                                    <div className="w-[323.79px] left-0 top-[7.95px] absolute text-center text-black text-base font-medium font-['Clash Display'] leading-7">Continue</div>
                                </div>
                                <div className="w-[323.79px] h-[43.70px] relative">
                                    <div className="w-[323.79px] h-[43.70px] left-0 top-0 absolute bg-[#1F1F1F] rounded-lg" />
                                    <div className="w-[323.79px] left-0 top-[7.95px] absolute text-center text-[#F5D949] text-base font-medium font-['Clash Display'] leading-7">back</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}