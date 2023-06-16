import React from "react";

interface PhoneMockupProps {
    children: React.ReactNode | React.ReactNode[];
}

const PhoneMockup = ({ children }: PhoneMockupProps) => {
    return (
        <div className="mockup-phone border-primary h-4/5 w-1/5">
            <div className="camera" />
            <div className="display h-full w-full">
                <div className="artboard phone-1 mt-6 rounded-md" style={{width: '100%', height: '95%'}}>
                    {children}
                </div>
            </div>
        </div>
    )
};

export default PhoneMockup;



