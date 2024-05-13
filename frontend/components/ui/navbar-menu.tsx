import React from "react";

export const MenuItem = ({
  item,
  sectionId,
}: {
  item: string;
  sectionId: string;
  children?: React.ReactNode;
}) => {
  const handleClick = () => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <button className="menu-item hover:opacity-[0.8]" onClick={handleClick}>
      {item}
    </button>
  );
};

export const Menu = ({ children }: { children: React.ReactNode }) => {
  return (
    <nav className="relative rounded-full boder border-transparent dark:bg-black dark:border-white/[0.2] bg-white shadow-input flex justify-center space-x-4 px-8 py-6 ">
      {children}
    </nav>
  );
};
//
// export const HoveredLink = ({ children, ...rest }: any) => {
//   return (
//     <Link
//       {...rest}
//       className="text-neutral-700 dark:text-neutral-200 hover:text-black "
//     >
//       {children}
//     </Link>
//   );
// };
