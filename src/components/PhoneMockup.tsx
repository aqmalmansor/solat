import React from "react";

interface PhoneMockupProps {
    children: React.ReactNode | React.ReactNode[];
}

const PhoneMockup = ({ children }: PhoneMockupProps) => {
    return (
        <div className="mockup-phone border-primary h-phoneHeight w-phoneWidth invisible md:visible">
            <div className="camera" />
            <div className="display h-full w-full bg-base-100 overflow-hidden">
                <div className="artboard phone-1 rounded-md" style={{width: '100%', height: '100%'}}>
                    {children}
                </div>
            </div>
        </div>
    )
};

export default PhoneMockup;



