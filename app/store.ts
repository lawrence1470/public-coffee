import { proxy } from "valtio";

export const state = proxy({
  intro: true,
  colors: ["#FF6B35", "#FF8C42", "#FFB380", "#E55A2B", "#CC4A1F", "#B33A13"],
  decals: ["react", "three2", "pmndrs"],
  color: "#FF6B35",
  decal: "three2",
});
