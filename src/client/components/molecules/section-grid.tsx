import React, { ReactNode } from "react";
import classNames from "classnames";

interface SectionGridProps extends React.HTMLAttributes<HTMLElement> {
  children: ReactNode;
}

const SectionGrid: React.FC<SectionGridProps> = ({
  children,
  className,
  ...rest
}) => {
  const containerClass = classNames(
    className,
    "hide-scrollbar -mr-4 flex snap-x overflow-x-scroll pr-4 pb-5 *:shrink-0 *:snap-start *:not-[.gradient]:w-64 gap-4 overflow-y-hidden"
  );

  return (
    <div className="relative">
      <section className="relative w-full" {...rest}>
        <div className={containerClass}>{children}</div>
      </section>
    </div>
  );
};

export default SectionGrid;
