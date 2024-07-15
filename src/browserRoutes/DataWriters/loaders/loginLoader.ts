import { redirect } from "react-router-dom";
import { localStorageProvider } from "../../../utils/methods";
import { GenericPaths } from "../../../services/genericPaths";

export default async function loginLoader() {
  let authData = localStorageProvider.get(GenericPaths.AUTH_DATA_LOCAL_STORAGE);
  if (authData) {
    return redirect("/");
  }
  return null;
}
