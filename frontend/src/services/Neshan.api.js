import axios from "axios";
// اینو بزار تو  .env خانم سپهوند
const NESHAN_API_KEY = "service.617082f3ec49406a85ce8cc8f1fd2531";

export const FetchAddressNeshan = async (data) => {
  // console.log(NESHAN_API_KEY);

  try {
    const response = await axios.get(
      `https://api.neshan.org/v5/reverse?lat=${data.lat}&lng=${data.lng}`,
      {
        headers: { "Api-Key": NESHAN_API_KEY },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching address:", error);
  }
};
