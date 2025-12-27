import axios from "axios";
export const FetchAddressNeshan = async (data) => {
  const NESHAN_API_KEY = "service.69a8e727e6f74d7681c68c0d2160408b";
  console.log(NESHAN_API_KEY);

  try {
    const response = await axios.get(
      `https://api.neshan.org/v5/reverse?lat=${data.lat}&lng=${data.lng}`,
      {
        headers: { "Api-Key": NESHAN_API_KEY },
      }
    );
    console.log(response)
    return response.data;
  } catch (error) {
    console.error("Error fetching address:", error);
  }
};
