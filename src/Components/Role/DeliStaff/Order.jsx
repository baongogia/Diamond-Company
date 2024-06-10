import React, { useState } from "react";
import { Stepper, Step, StepLabel } from "@mui/material";

function CustomStepIcon({ active, completed, icon }) {
  const icons = {
    1: <ion-icon name="bag-outline"></ion-icon>,
    2: <ion-icon name="bag-check-outline"></ion-icon>,
    3: <ion-icon name="airplane-outline"></ion-icon>,
    4: <ion-icon name="checkmark-done-circle-outline"></ion-icon>,
  };
  return (
    <div
      className={`border-[0.1em] border-green-700 p-3 w-10 h-10 flex justify-center items-center -translate-y-2 rounded-full ${
        active ? "bg-green-500 text-white" : "bg-search text-green-500"
      } ${completed ? "completed" : ""}`}
    >
      {completed ? finishIcon : icons[String(icon)]}
    </div>
  );
}
const steps = ["Order", "Confirm", "Delivering", "Received"];
const finishIcon = <ion-icon name="checkmark-circle-outline"></ion-icon>;
function DeliveryProgress({ activeStep }) {
  return (
    <div>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel
              sx={{
                ".MuiStepLabel-label": {
                  fontFamily: "SF Mono",
                  color: "white",
                  "&.Mui-active": {
                    color: "green", // Active
                  },
                  "&.Mui-completed": {
                    color: "gray",
                  },
                },
              }}
              StepIconComponent={CustomStepIcon}
            >
              {label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <div className="flex items-center">
            <div className="translate-x-9 mt-5">Delivery is complete</div>
            <div className="translate-x-9 translate-y-3 ml-2 text-yellow-500">
              <ion-icon name="star"></ion-icon>
            </div>
          </div>
        ) : (
          <div className=""></div>
        )}
      </div>
    </div>
  );
}
export default function Order() {
  const [order, setOrder] = React.useState(false);
  const [details, setDetails] = React.useState(false);
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  return (
    <div
      onMouseEnter={() => setDetails(true)}
      onMouseLeave={() => setDetails(false)}
      className={`w-full h-[5.5em] mt-5 flex justify-around items-center bg-box rounded-3xl ${
        order ? "hidden" : ""
      }`}
    >
      <div
        style={{
          backgroundImage: `url('https://www.berganza.com/timthumb.php?wm=0&src=https%3A%2F%2Fwww.berganza.com%2Fimages%2Fjewellery%2Fjewelleryitemphoto_19200_12.jpg&h=768')`,
        }}
        className="w-[17%] h-[85%] rounded-xl bg-cover bg-center"
      ></div>
      <div className="w-[60%] overflow-hidden">
        <div className="text-ellipsis overflow-hidden whitespace-nowrap">
          Vintage Ceylon Sapphire
        </div>
        <div className="">VND 956,207,100</div>
      </div>
      <div
        onClick={() => setOrder(true)}
        className={`hover:text-green-700 cursor-pointer`}
      >
        <ion-icon size="large" name="checkmark-circle-outline"></ion-icon>
      </div>
      {/* Order details */}
      <div
        className={`fixed bottom-7 left-4 z-[-1] rounded-2xl flex flex-col justify-around  ${
          details ? "translate-x-full" : ""
        } w-[32vw] h-[63.5vh] bg-main transition-all duration-500`}
      >
        <div className="w-full float-right">
          <DeliveryProgress activeStep={activeStep} />
          <div
            onClick={handleNext}
            className={`translate-x-9 hover:bg-main hover:text-green-700 border-[0.1em] px-6 py-2 w-24 text-center mt-5 ${
              activeStep === 4 ? "bg-main pointer-events-none" : "bg-green-700"
            } cursor-pointer`}
          >
            {activeStep === 3 ? "Done" : "Next"}
          </div>
        </div>
        {/* Order information */}
        <div className="translate-x-9 -translate-y-10">
          <div className="">Product: Vintage Ceylon Sapphire</div>
          <div className="">Price: VND 956,207,100</div>
          <div className="">Quantity: 1</div>
          <div className="">To: Ho Chi Minh City</div>
          <div className="">Shipping: Free</div>
          <div className="">Total: đ956,207,100</div>
          <div
            className={`w-[85%] h-10 flex items-center indent-5 mt-4 rounded-full ${
              activeStep === 4 ? "bg-green-500" : "bg-red-400"
            }`}
          >
            Process: {activeStep === 4 ? "Complete" : steps[activeStep]}
          </div>
        </div>
      </div>
    </div>
  );
}
