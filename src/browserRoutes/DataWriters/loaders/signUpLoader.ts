import { redirect } from "react-router-dom";
import { GenericPaths } from "../../../services/genericPaths";
import { localStorageProvider } from "../../../utils/methods";

export default async function signUpLoader() {
  let authData = localStorageProvider.get(GenericPaths.AUTH_DATA_LOCAL_STORAGE);
  if (authData) {
    return redirect("/");
  }
  return null;
}
