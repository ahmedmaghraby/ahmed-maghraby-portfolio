"use client";
import "../animations/animate.css";
import { motion } from "framer-motion";
import React from "react";
const Contact = () => {
  const sendEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const name = (form.elements.namedItem("name") as HTMLInputElement).value;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const subject = (form.elements.namedItem("subject") as HTMLInputElement)
      .value;
    const message = (form.elements.namedItem("message") as HTMLTextAreaElement)
      .value;
    console.log(name, email, message);
    let body = JSON.stringify({
      access_key: "17be2045-4696-4f3a-8797-d50b4d08ec71",
      name: name,
      email: email,
      message: `subject : ${subject} \n  message: ${message}`,
    });
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: body,
    });
    const result = await response.json();
    if (result.success) {
      console.log(result);
      form.reset();
      alert(
        "Your message has been sent successfully. We will contact you soon."
      );
    }
    // window.open(
    //   `mailto:Info@phoonix.com?subject=${subject}&body=Name: ${name}%0D%0AEmail: ${email}%0D%0AMessage: ${message}`
    // );
  };

  return (
    <motion.section
      className="relative z-10 flex items-center justify-center w-full"
      id="contact"
      initial="initial"
      animate="animate"
    >
      <div id="contact">
        <div className="container">
          <div className="heading-wrapper">
            <div className="heading">
              <p className="title">
                Want to <br />
                contact us?
              </p>
              <p className="separator" />
              <p className="subtitle">
                Please, use the form below or send an email to {""}
                <a href="mailto:Info@phoonix.com" className="mail">
                  Info
                  <span className="text-secondary">@</span>
                  phoenix
                  <span className="text-secondary">.</span>
                  com
                </a>
                :
              </p>
            </div>
          </div>
          <form id="contact-form" onSubmit={sendEmail}>
            <input placeholder="Name" name="name" type="text" required />
            <input placeholder="Email" name="email" type="email" required />
            <input placeholder="Subject" name="subject" type="text" required />
            <textarea placeholder="Message" name="message" required />
            <input
              className="button"
              id="submit"
              value="Submit"
              type="submit"
            />
          </form>
        </div>
      </div>
      {/* <ContactBackground />
      <div classNameName="mx-auto  flex w-[90%] flex-col items-center justify-center pt-10 md:pt-0">
        <div
          classNameName={`relative flex w-full flex-col items-center justify-center sm:items-center lg:max-w-[1440px] `}
        >
          <AnimatedWords
            title={"Find me!"}
            style={
              "flex text-left font-extrabold uppercase leading-[1.1em] text-secondary text-[18vw] flex-row items-center justify-center text-center "
            }
          />
        </div>

        <div classNameName="mt-20 flex w-full flex-col items-end justify-center gap-16 sm:mt-32 sm:gap-12 md:mt-40 md:flex-row md:items-start md:justify-between lg:mt-12 lg:max-w-[1440px]">
          <div classNameName="flex flex-col items-center text-base font-semibold text-center uppercase text-main md:items-start md:text-left">
            <AnimatedBody
              text={"Let's create something amazing together. Contact me!"}
              classNameName={
                "-mb-1 inline-block overflow-hidden pt-1 sm:-mb-2 md:-mb-3 lg:-mb-4"
              }
            />
            <Link
              href="mailto:ahmedhamdy078@gmail.com"
              target="_blank"
              aria-label="Send me an email"
              classNameName="flex-1 mt-1 text-center underline underline-offset-2 hover:no-underline sm:mt-2 lg:mt-4 lg:text-left"
            >
              <AnimatedBody
                text={"Send me an email"}
                classNameName={"cursor-pointer text-center lg:text-left"}
              />
            </Link>
          </div>

          <div classNameName="flex flex-col items-center justify-center w-full font-bold text-main md:flex-row md:justify-between ">
            <Link
              href="https://www.linkedin.com/in/amaghraby/"
              target="_blank"
              aria-label="View my linkedin Profile"
            >
              <AnimatedTitle
                text={"LINKEDIN"}
                classNameName={"cursor-pointer text-base font-bold text-main"}
                wordSpace={"mr-[0.25em]"}
                charSpace={"mr-[0.01em]"}
              />
            </Link>
            <Link
              href="https://github.com/ahmedmaghraby"
              target="_blank"
              aria-label="View GitHub MyProfile"
            >
              <AnimatedTitle
                text={"GITHUB"}
                classNameName={"cursor-pointer text-base font-bold text-main"}
                wordSpace={"mr-[0.25em]"}
                charSpace={"mr-[0.01em]"}
              />
            </Link>
            <Link
              href="https://calendar.app.google/rPaupi1Yd5vjJahRA"
              target="_blank"
              aria-label="Book a meeting with me"
            >
              <AnimatedTitle
                text={"CALENDAR"}
                classNameName={"cursor-pointer text-base font-bold text-main"}
                wordSpace={"mr-[0.25em]"}
                charSpace={"mr-[0.01em]"}
              />
            </Link>
          </div>
        </div>
      </div> */}
    </motion.section>
  );
};

export default Contact;
