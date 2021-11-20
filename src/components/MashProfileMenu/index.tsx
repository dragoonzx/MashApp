import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { classNames } from "../../utils/classNames";
import { state, useSnapshot } from '../../state'
import logo2 from '../../assets/logo2.png'

const user = {
  name: "Tom Cook",
  email: "tom@example.com",
  imageUrl: logo2
};

const userNavigation = [
    { name: 'Your Profile', href: '#' },
    { name: 'Settings', href: '#' },
    { name: 'Sign out', href: '#' },
  ]

function MashProfileMenu() {
  const snap = useSnapshot(state)

  return (
    <>
      {/* Profile dropdown */}
      <Menu as="div" className="ml-3 relative">
        <div>
          <Menu.Button className="max-w-xs bg-gray-800 relative rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
            <span className="sr-only">Open user menu</span>
            <img className="h-14 w-14 rounded-full" src={snap.currentUser?.image ? snap.currentUser.image.alternatives[0].src : user.imageUrl} alt="" />
            {snap.currentUser && <p className="absolute bottom-0 left-0">{snap.currentUser.emoji}</p>}
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <div className="origin-top-right absolute z-10 right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
            {snap.currentUser?.name && <p className="text-black p-4 border-b">Hello, {snap.currentUser?.name}!</p>}
            <Menu.Items >
              {userNavigation.map((item) => (
                <Menu.Item key={item.name}>
                  {({ active }) => (
                    <a
                      href={item.href}
                      className={classNames(
                        active ? "bg-gray-100" : "",
                        "block px-4 py-2 text-sm text-gray-700"
                      )}
                    >
                      {item.name}
                    </a>
                  )}
                </Menu.Item>
              ))}
            </Menu.Items>
          </div>
        </Transition>
      </Menu>
    </>
  );
}

export default MashProfileMenu;
