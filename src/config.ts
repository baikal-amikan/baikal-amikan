import { Context, useContext } from "react";

export async function getData(url: string) {
  const response = await fetch(url);
  try {
    if (response.status !== 200) {
      console.log(`Failed to fetch ${url}. Response: ${response}`);
      return undefined;
    }
    return response.json();
  } catch (error) {
    console.log(`Failed (${error}) to fetch ${url}. Response: ${response}`);
    return undefined;
  }
}

export function useSafeContext<T>(context: Context<T | undefined>, message?: string): T {
  const result = useContext(context);
  if (result === undefined) {
    throw new Error(message ?? "Missing required context");
  }
  return result;
}