import { Dimensions } from "react-native";
const { height, width } = Dimensions.get('window');

export const COLORS = {
    white: "#FFFFFF",
    black: "#222222",
    primary: "#7C9A92",
    secondary: "#39B68D",
    grey: "#BEC2C2",
    background: "#253334"
};

export const SIZES = {
    base: 8,
    font: 14,
    radius: 30,
    padding: 8,
    padding2: 12,
    padding3: 16,

    largeTitle: 50,
    h1: 30,
    h2: 22,
    h3: 20,
    h4: 18,
    body1: 30,
    body2: 20,
    body3: 16,
    body4: 14,

    width,  // Corrected typo
    height,
};

export default COLORS;
