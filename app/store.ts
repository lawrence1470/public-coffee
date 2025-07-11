import { proxy } from "valtio";

export const state = proxy({
  intro: true,
  colors: ["#000000", "#ffffff", "#333333", "#666666", "#999999", "#cccccc"],
  decals: ["react", "three2", "pmndrs"],
  color: "#000000",
  decal: "three2",
});
