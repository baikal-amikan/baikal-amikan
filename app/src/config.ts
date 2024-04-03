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

export async function sentEmail(subject: string, body: string, replyToEmail: string, replyToName: string) {
  console.log(`sentEmail: ${subject}, ${body}, ${replyToEmail}, ${replyToName}`);

  // const query = `subject=${ZAPIER_HOOK_URL}?{subject}&body=${body}&replyToEmail=${replyToEmail}&replyToName=${replyToName}`;
  // const url = `?${query}`;
  // if (
  //   replyToEmail !== undefined && replyToEmail !== "" &&
  //   body !== undefined  && body !== "" &&
  //   replyToName !== undefined  && replyToName !== ""  &&
  //   (subject == "Baikal-Amikan: Book a tour" || subject == "Baikal-Amikan: New review" || subject == "Baikal-Amikan: Contact us")) {
  //     try {
  //       const response = await fetch(url,
  //         {method: 'POST'});
  //       if (response.status !== 200) {
  //         console.log(`Failed to sent query: ${url}. Response: ${response.status}`);
  //         return {"status": "response status error"};
  //       }
  //       return {"status": "success"};
  //     } catch (error) {
  //       console.log(`Failed to sent ${url}. Error: ${error}`);
  //       return {"status": "general error"};
  //     }
  // }
  // console.log(`Failed to verify ${url}.`);
  // return {"status": "verification data error"};
}
