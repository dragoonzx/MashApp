import React from 'react'
import { Link } from 'react-router-dom'

export const MashHomeMain = () => {
    return (
        <div>
            <div>

                {/* <img className="mx-auto mt-8" src="img/2865070.svg" /> */}

                <div className="py-12 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="lg:text-center">
                            <h2
                                className="
                text-base text-indigo-600
                font-semibold
                tracking-wide
                uppercase
              "
                            >
                                Explore Music
                            </h2>
                            <p
                                className="
                mt-2
                text-3xl
                leading-8
                font-extrabold
                tracking-tight
                text-gray-900
                sm:text-4xl
              "
                            >
                                A better way to consume music
                            </p>
                            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
                                Listen & Create in one app
                            </p>
                        </div>
                    </div>
                </div>

                <div
                    className="px-8 py-12 lg:py-16 flex justify-around items-center bg-gray-50"
                >
                    <h2
                        className="
            text-3xl
            font-extrabold
            leading-9
            tracking-tight
            text-gray-900
            sm:text-4xl sm:leading-10
          "
                    >
                        Ready to create new mashup?
                        <br />
                        <span className="text-indigo-600"
                        >Unlimited decentralized music & editor</span
                        >
                    </h2>

                    <div className="flex mt-8 lg:flex-shrink-0 lg:mt-0">
                        <div className="inline-flex rounded-md shadow">
                            <Link
                                to="/explore"
                                className="
                inline-flex
                items-center
                justify-center
                px-24
                py-3
                text-base
                font-medium
                leading-6
                text-white
                transition
                duration-150
                ease-in-out
                bg-indigo-600
                border border-transparent
                rounded-md
                hover:bg-indigo-500
                focus:outline-none
              "
                            >Create</Link
                            >
                        </div>
                    </div>
                </div>

                <div className="py-12 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="mt-10">
                            <dl
                                className="
                space-y-10
                md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10
              "
                            >
                                <div className="relative">
                                    <dt>
                                        <div
                                            className="
                      absolute
                      flex
                      items-center
                      justify-center
                      h-12
                      w-12
                      rounded-md
                      bg-indigo-500
                      text-white
                    "
                                        >
                                            <svg
                                                className="h-6 w-6"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                                aria-hidden="true"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                                                />
                                            </svg>
                                        </div>
                                        <p className="ml-16 text-lg leading-6 font-medium text-gray-900">
                                            No censorship
                                        </p>
                                    </dt>
                                    <dd className="mt-2 ml-16 text-base text-gray-500">
                                        We are fully decentralized, so no one can tell you what you should do in your mashups
                                    </dd>
                                </div>

                                <div className="relative">
                                    <dt>
                                        <div
                                            className="
                      absolute
                      flex
                      items-center
                      justify-center
                      h-12
                      w-12
                      rounded-md
                      bg-indigo-500
                      text-white
                    "
                                        >
                                            <svg
                                                className="h-6 w-6"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                                aria-hidden="true"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
                                                />
                                            </svg>
                                        </div>
                                        <p className="ml-16 text-lg leading-6 font-medium text-gray-900">
                                            Completely free
                                        </p>
                                    </dt>
                                    <dd className="mt-2 ml-16 text-base text-gray-500">
                                        No premium subscription, no ads, all functionality available from the start
                                    </dd>
                                </div>

                                <div className="relative">
                                    <dt>
                                        <div
                                            className="
                      absolute
                      flex
                      items-center
                      justify-center
                      h-12
                      w-12
                      rounded-md
                      bg-indigo-500
                      text-white
                    "
                                        >
                                            <svg
                                                className="h-6 w-6"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                                aria-hidden="true"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M13 10V3L4 14h7v7l9-11h-7z"
                                                />
                                            </svg>
                                        </div>
                                        <p className="ml-16 text-lg leading-6 font-medium text-gray-900">
                                            It's simple
                                        </p>
                                    </dt>
                                    <dd className="mt-2 ml-16 text-base text-gray-500">
                                        MashApp doesn't have token and other attributes of decentralized projects. You don't need to learn extra stuff to get going
                                    </dd>
                                </div>

                                <div className="relative">
                                    <dt>
                                        <div
                                            className="
                      absolute
                      flex
                      items-center
                      justify-center
                      h-12
                      w-12
                      rounded-md
                      bg-indigo-500
                      text-white
                    "
                                        >
                                            <svg
                                                className="h-6 w-6"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                                aria-hidden="true"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                                                />
                                            </svg>
                                        </div>
                                        <p className="ml-16 text-lg leading-6 font-medium text-gray-900">
                                            It's fun
                                        </p>
                                    </dt>
                                    <dd className="mt-2 ml-16 text-base text-gray-500">
                                        Explore trending list and fiddle with our simple editor. We hope you will like it!
                                    </dd>
                                </div>
                            </dl>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
