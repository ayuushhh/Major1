import axios from "axios";
import FormData from "form-data";

// const dotenv = require("dotenv");

export const pinFileToIPFS = async (image, propertyId) => {
    const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;

    //we gather a local file for this example, but any valid readStream source will work here.
    let data = new FormData();
    data.append("file", image);

    //You'll need to make sure that the metadata is in the form of a JSON object that's been convered to a string
    //metadata is optional
    const metadata = JSON.stringify({
        name: propertyId,
        keyvalues: {},
    });
    data.append("pinataMetadata", metadata);

    //pinataOptions are optional
    const pinataOptions = JSON.stringify({
        cidVersion: 0,
        customPinPolicy: {
            regions: [
                {
                    id: "FRA1",
                    desiredReplicationCount: 1,
                },
                {
                    id: "NYC1",
                    desiredReplicationCount: 2,
                },
            ],
        },
    });
    data.append("pinataOptions", pinataOptions);

    try {
        const response = await axios.post(url, data, {
            maxBodyLength: "Infinity",
            headers: {
                "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
                pinata_api_key: "9fc1b270caec5b7dade4",
                pinata_secret_api_key:
                    "88377bac5696bdeab875ee83c1394f92b0639fa42fe045654f0b7f35c71dcfee",
            },
        });
        //handle response here
        console.log("response:", response);
        return response;
    } catch (error) {
        //handle error here
        console.log("error:", error);
    }
};
