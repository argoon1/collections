import { axiosMain } from "../../../../../api/axiosConfig";
import { useEffect } from "react";
import axios from "axios";
import { getAxiosPostOptions } from "../../../../../utils/axiosUtils";
async function likeItem(itemId: string) {
  try {
    alert("POST");
    await axiosMain.post(
      `users/collections/like/${itemId}`,
      {},
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );
  } catch (e) {}
}

export { likeItem };
