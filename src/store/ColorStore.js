import { create } from "zustand";

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const shuffleArrayWithId = () => {
  const initialColors = ["red", "green", "violet", "blue", "yellow", "orange"];
  const shuffledArray = initialColors.map((color, index) => ({
    id: index + 1,
    color,
  }));

  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }

  return shuffledArray;
};

const useColorStore = create((set) => ({
  RandomColorsArray: [],
  generateRandomColors: () => {
    const shuffledColors = shuffleArrayWithId();
    set({ RandomColorsArray: shuffledColors });
  },
  NoOfTries: 3,
  InitialColors: [
    { id: 1, color: "red" },
    { id: 2, color: "blue" },
    { id: 3, color: "yellow" },
    { id: 4, color: "violet" },
    { id: 5, color: "orange" },
    { id: 6, color: "green" },
  ],
  UserGeneratedColors: [
    {
      id: 1,
      colors: [
        { id: 1, color: "" },
        { id: 2, color: "" },
        { id: 3, color: "" },
        { id: 4, color: "" },
        { id: 5, color: "" },
        { id: 6, color: "" },
      ],
    },
  ],
  updateUGColors: (newColorArray) => {
    const { UserGeneratedColors, NoOfTries } = useColorStore.getState();
    const updatedUserGeneratedColors = UserGeneratedColors.map((entry) =>
      entry.id === NoOfTries ? { ...entry, colors: newColorArray } : entry
    );

    useColorStore.setState({ UserGeneratedColors: updatedUserGeneratedColors });
  },
  getUGColorsByTries: () => {
    const { UserGeneratedColors, NoOfTries } = useColorStore.getState();
    const userGeneratedColors = UserGeneratedColors.find(
      (entry) => entry.id === NoOfTries
    );
    return userGeneratedColors ? userGeneratedColors.colors : [];
  },

  getMatchingColors: (id, newColorArray) => {
    const { UserGeneratedColors, RandomColorsArray } = useColorStore.getState();

    // Check for matching colors and return the count
    const matchingColors = [];
    const userColors = newColorArray.map((userColor) => userColor.color);
    const randomColors = RandomColorsArray.map((ranCol) => ranCol.color);
    userColors.forEach((userColor, index) => {
      const randomColor = randomColors[index];
      if (randomColor === userColor) {
        matchingColors.push({ color: userColor, index });
      }
    });
    // Update the user-generated colors for the current NoOfTries
    const updatedUserGeneratedColors = UserGeneratedColors.map((entry) =>
      entry.id === id
        ? { ...entry, colors: newColorArray, matching: matchingColors.length }
        : entry
    );
    useColorStore.setState({ UserGeneratedColors: updatedUserGeneratedColors });
    return matchingColors.length;
  },
  IncreamentUGColorsArray: () => {
    const { UserGeneratedColors, RandomColorsArray } = useColorStore.getState();
    if (UserGeneratedColors.length < 5) {
      useColorStore.setState({ NoOfTries: UserGeneratedColors.length + 1 });
      const newColorEntry = {
        id: UserGeneratedColors.length + 1,
        colors: [
          { id: 1, color: "" },
          { id: 2, color: "" },
          { id: 3, color: "" },
          { id: 4, color: "" },
          { id: 5, color: "" },
          { id: 6, color: "" },
        ],
        matching: 0,
      };
      useColorStore.setState((state) => ({
        UserGeneratedColors: [...state.UserGeneratedColors, newColorEntry],
      }));
    } else {
      const newColorEntry = {
        id: UserGeneratedColors.length + 1,
        colors: RandomColorsArray,
      };
      useColorStore.setState((state) => ({
        UserGeneratedColors: [...state.UserGeneratedColors, newColorEntry],
      }));
    }
  },
  EmptyColors: [
    { id: 1, color: "" },
    { id: 2, color: "" },
    { id: 3, color: "" },
    { id: 4, color: "" },
    { id: 5, color: "" },
    { id: 6, color: "" },
  ],
}));

export default useColorStore;
