"use client";

import { Fragment, useEffect, useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
} from "@headlessui/react";
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  UserCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useToast } from "@/hooks/use-toast";
import supabase from "@/lib/supabase";
import { User } from "@supabase/supabase-js";

import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import Link from "next/link";

const navigation = {
  categories: [
    {
      name: "Women",
      featured: [
        {
          name: "New Arrivals",
          href: "#",
          imageSrc: "/img/mega-menu-category-01.jpg",
          imageAlt:
            "Models sitting back to back, wearing Basic Tee in black and bone.",
        },
        {
          name: "Basic Tees",
          href: "#",
          imageSrc: "/img/mega-menu-category-02.jpg",
          imageAlt:
            "Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees.",
        },
        {
          name: "Accessories",
          href: "#",
          imageSrc: "/img/mega-menu-category-03.jpg",
          imageAlt:
            "Model wearing minimalist watch with black wristband and white watch face.",
        },
        {
          name: "Carry",
          href: "#",
          imageSrc: "/img/mega-menu-category-04.jpg",
          imageAlt:
            "Model opening tan leather long wallet with credit card pockets and cash pouch.",
        },
      ],
    },
    {
      name: "Men",
      featured: [
        {
          name: "New Arrivals",
          href: "#",
          imageSrc:
            "https://tailwindui.com/img/ecommerce-images/mega-menu-01-men-category-01.jpg",
          imageAlt:
            "Hats and sweaters on wood shelves next to various colors of t-shirts on hangers.",
        },
        {
          name: "Basic Tees",
          href: "#",
          imageSrc:
            "https://tailwindui.com/img/ecommerce-images/mega-menu-01-men-category-02.jpg",
          imageAlt: "Model wearing light heather gray t-shirt.",
        },
        {
          name: "Accessories",
          href: "#",
          imageSrc:
            "https://tailwindui.com/img/ecommerce-images/mega-menu-01-men-category-03.jpg",
          imageAlt:
            "Grey 6-panel baseball hat with black brim, black mountain graphic on front, and light heather gray body.",
        },
        {
          name: "Carry",
          href: "#",
          imageSrc:
            "https://tailwindui.com/img/ecommerce-images/mega-menu-01-men-category-04.jpg",
          imageAlt:
            "Model putting folded cash into slim card holder olive leather wallet with hand stitching.",
        },
      ],
    },
  ],
  pages: [
    { name: "Products", href: "/products" },
    { name: "Categories", href: "/categories" },
  ],
};

export default function Navbar() {
  const [open, setOpen] = useState(false);
  // const [isBagOpen, setIsBagOpen] = useState(false)

  const [user, setUser] = useState<User | null>(null);
  // console.log(user);
  // const products = useAppSelector((state) => state.cart.cart)
  // const totalProducts = products.reduce((total) => total + 1, 0)

  const { toast } = useToast();

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
    };
    checkUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    } else {
      toast({
        title: "Success",
        description: "Signed out successfully",
      });
      setUser(null);
    }
  };

  return (
    <div>
      {/* Mobile menu */}
      <Dialog open={open} onClose={setOpen} className="relative z-40 lg:hidden">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-black bg-opacity-25 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
        />

        <div className="fixed inset-0 z-40 flex">
          <DialogPanel
            transition
            className="relative flex w-full max-w-xs transform flex-col overflow-y-auto bg-white pb-12 shadow-xl transition duration-300 ease-in-out data-[closed]:-translate-x-full"
          >
            <div className="flex px-4 pb-2 pt-5">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="-m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon aria-hidden="true" className="h-6 w-6" />
              </button>
            </div>

            {/* Links */}
            <TabGroup className="mt-2">
              <div className="border-b border-gray-200">
                <TabList className="-mb-px flex space-x-8 px-4">
                  {navigation.categories.map((category) => (
                    <Tab
                      key={category.name}
                      className="flex-1 whitespace-nowrap border-b-2 border-transparent px-1 py-4 text-base font-medium text-gray-900 data-[selected]:border-indigo-600 data-[selected]:text-indigo-600"
                    >
                      {category.name}
                    </Tab>
                  ))}
                </TabList>
              </div>
              <TabPanels as={Fragment}>
                {navigation.categories.map((category) => (
                  <TabPanel
                    key={category.name}
                    className="space-y-12 px-4 py-6"
                  >
                    <div className="grid grid-cols-2 gap-x-4 gap-y-10">
                      {category.featured.map((item) => (
                        <div key={item.name} className="group relative">
                          <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-md bg-gray-100 group-hover:opacity-75">
                            <Image
                              height={200}
                              width={200}
                              alt={item.imageAlt}
                              src={item.imageSrc}
                              className="object-cover object-center"
                            />
                          </div>
                          <Link
                            href={item.href}
                            className="mt-6 block text-sm font-medium text-gray-900"
                          >
                            <span
                              aria-hidden="true"
                              className="absolute inset-0 z-10"
                            />
                            {item.name}
                          </Link>
                          <p
                            aria-hidden="true"
                            className="mt-1 text-sm text-gray-500"
                          >
                            Shop now
                          </p>
                        </div>
                      ))}
                    </div>
                  </TabPanel>
                ))}
              </TabPanels>
            </TabGroup>

            <div className="space-y-6 border-t border-gray-200 px-4 py-6">
              {navigation.pages.map((page) => (
                <div key={page.name} className="flow-root">
                  <Link
                    href={page.href}
                    className="-m-2 block p-2 font-medium text-gray-900"
                  >
                    {page.name}
                  </Link>
                </div>
              ))}
            </div>
          </DialogPanel>
        </div>
      </Dialog>

      {/* <BagModal open={isBagOpen} setOpen={setIsBagOpen} products={products} /> */}

      <header className="relative">
        <nav aria-label="Top">
          {/* Top navigation */}
          <div className="bg-white">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex h-16 items-center justify-between">
                {/* Logo (lg+) */}
                <div className="hidden lg:flex lg:flex-1 lg:items-center">
                  <Link href="/">
                    <span className="sr-only">Your Company</span>
                    <Image
                      height={32}
                      width={32}
                      alt="logo"
                      src="/img/logo.png"
                      className="h-8 w-auto"
                    />
                  </Link>
                </div>

                <div className="hidden h-full lg:flex">
                  {/* Flyout menus */}
                  <PopoverGroup className="inset-x-0 bottom-0 px-4">
                    <div className="flex h-full justify-center space-x-8">
                      {navigation.categories.map((category) => (
                        <Popover key={category.name} className="flex">
                          <div className="relative flex">
                            <PopoverButton className="group relative flex items-center justify-center text-sm font-medium text-gray-700 transition-colors duration-200 ease-out hover:text-gray-800 data-[open]:text-indigo-600">
                              {category.name}
                              <span
                                aria-hidden="true"
                                className="absolute inset-x-0 -bottom-px z-20 h-0.5 transition duration-200 ease-out group-data-[open]:bg-indigo-600"
                              />
                            </PopoverButton>
                          </div>

                          <PopoverPanel
                            transition
                            className="group absolute inset-x-0 top-full z-10 bg-white text-sm text-gray-500 transition data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in"
                          >
                            {/* Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow */}
                            <div
                              aria-hidden="true"
                              className="absolute inset-0 top-1/2 bg-white shadow"
                            />
                            {/* Fake border when menu is open */}
                            <div
                              aria-hidden="true"
                              className="absolute inset-0 top-0 mx-auto h-px max-w-7xl px-8"
                            >
                              <div className="h-px w-full bg-transparent transition-colors duration-200 ease-out group-data-[open]:bg-gray-200" />
                            </div>

                            <div className="relative">
                              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                                <div className="grid grid-cols-4 gap-x-8 gap-y-10 py-16">
                                  {category.featured.map((item) => (
                                    <div
                                      key={item.name}
                                      className="group relative"
                                    >
                                      <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-md bg-gray-100 group-hover:opacity-75">
                                        <Image
                                          height={200}
                                          width={200}
                                          alt={item.imageAlt}
                                          src={item.imageSrc}
                                          className="object-cover object-center"
                                        />
                                      </div>
                                      <Link
                                        href={item.href}
                                        className="mt-4 block font-medium text-gray-900"
                                      >
                                        <span
                                          aria-hidden="true"
                                          className="absolute inset-0 z-10"
                                        />
                                        {item.name}
                                      </Link>
                                      <p aria-hidden="true" className="mt-1">
                                        Shop now
                                      </p>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </PopoverPanel>
                        </Popover>
                      ))}

                      {navigation.pages.map((page) => (
                        <Link
                          key={page.name}
                          href={page.href}
                          className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
                        >
                          {page.name}
                        </Link>
                      ))}
                    </div>
                  </PopoverGroup>
                </div>

                {/* Mobile menu and search (lg-) */}
                <div className="flex flex-1 items-center lg:hidden">
                  <button
                    type="button"
                    onClick={() => setOpen(true)}
                    className="-ml-2 rounded-md bg-white p-2 text-gray-400"
                  >
                    <span className="sr-only">Open menu</span>
                    <Bars3Icon aria-hidden="true" className="h-6 w-6" />
                  </button>

                  {/* Search */}
                  <Link
                    href="#"
                    className="ml-2 p-2 text-gray-400 hover:text-gray-500"
                  >
                    <span className="sr-only">Search</span>
                    <MagnifyingGlassIcon
                      aria-hidden="true"
                      className="h-6 w-6"
                    />
                  </Link>
                </div>

                {/* Logo (lg-) */}
                <Link href="/" className="lg:hidden">
                  <span className="sr-only">Your Company</span>
                  <Image
                    height={32}
                    width={32}
                    alt="logo"
                    src="/img/logo.png"
                    className="h-8 w-auto"
                  />
                </Link>
                {!user ? (
                  <div className="flex flex-1 items-center justify-end">
                    <Link
                      href="#"
                      className="hidden text-sm font-medium text-gray-700 hover:text-gray-800 lg:block"
                    >
                      Search
                    </Link>
                    <div className="flex items-center lg:ml-8">
                      {/* Sign In */}
                      <Link
                        href="/sign-in"
                        className="p-2 text-gray-400 hover:text-gray-500 lg:hidden"
                      >
                        <span className="sr-only">Sign in</span>
                        <UserCircleIcon
                          aria-hidden="true"
                          className="h-6 w-6"
                        />
                      </Link>
                      <Link
                        href="/sign-in"
                        className="hidden text-sm font-medium text-gray-700 hover:text-gray-800 lg:block"
                      >
                        Sign in
                      </Link>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-1 items-center justify-end">
                    <Link
                      href="#"
                      className="hidden text-sm font-medium text-gray-700 hover:text-gray-800 lg:block"
                    >
                      Search
                    </Link>
                    <div className="flex items-center lg:ml-8">
                      {/* Profile */}
                      <Menu
                        as="div"
                        className="relative inline-block text-left"
                      >
                        <div>
                          <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 hover:text-gray-800">
                            Profile
                            <ChevronDownIcon
                              aria-hidden="true"
                              className="-mr-1 h-5 w-5 text-gray-400"
                            />
                          </MenuButton>
                        </div>

                        <MenuItems
                          transition
                          className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                        >
                          <div className="px-4 py-3">
                            <p className="text-sm">Signed in as</p>
                            <p className="truncate text-sm font-medium text-gray-900">
                              {user?.email}
                            </p>
                          </div>
                          <div className="py-1">
                            <MenuItem>
                              <Link
                                href="/dashboard"
                                className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                              >
                                Dashboard
                              </Link>
                            </MenuItem>
                            <MenuItem>
                              <Link
                                href="/dashboard/cart"
                                className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                              >
                                Cart
                              </Link>
                            </MenuItem>
                            <MenuItem>
                              <Link
                                href="#"
                                className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                              >
                                Settings
                              </Link>
                            </MenuItem>
                          </div>
                          <div className="py-1">
                            <form action="#" method="POST">
                              <MenuItem>
                                <button
                                  type="submit"
                                  onClick={handleSignOut}
                                  className="block w-full px-4 py-2 text-left text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                                >
                                  Sign out
                                </button>
                              </MenuItem>
                            </form>
                          </div>
                        </MenuItems>
                      </Menu>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
}
