import { useState } from "react";

export const useLottery = <T extends { id: string | number; weight: number }>(
  array: T[]
): [T | undefined, () => void] => {
  const [exclusions, setExclusions] = useState<(string | number | undefined)[]>(
    []
  );

  const handleDrawLottery = () => {
    const excludedArray = array.filter((item) => !exclusions.includes(item.id));

    const duplicatedArray = excludedArray.reduce((prev: T[], current: T) => {
      const duplicatedItem = [...Array(current.weight)].map(() => current);
      return [...prev, ...duplicatedItem];
    }, []);

    const rand = Math.floor(Math.random() * duplicatedArray.length);
    const result = duplicatedArray[rand];
    return setExclusions((prev) => [...prev, result?.id ?? undefined]);
  };

  const currentHit = array.find(
    (item) => item.id === exclusions[exclusions.length - 1]
  );

  return [currentHit, handleDrawLottery];
};
