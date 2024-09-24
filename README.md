
# README

## Overview

This project introduces a new API for retrieving product image sets from Cloudinary, replacing the existing AEM product image sets API. This new service enhances image management by leveraging Cloudinary's robust capabilities.

## Features

- **Image Set Retrieval**: Get product image sets directly from Cloudinary.
- **Cloud Infrastructure**: Deployed to Google Cloud using Express.
- **DevOps Support**: Implemented with supporting cloud infrastructure for seamless integration.
- **Akamai Integration**: Updated Akamai origin to point to the new service endpoint.

## Architecture

The new service architecture includes:
- **Express.js**: The web framework used to build the API.
- **Cloudinary**: Utilized for managing and serving product images.
- **Google Cloud**: The hosting environment for the service.
- **Akamai**: CDN for optimized delivery of product images.

## Getting Started

### Prerequisites

- Node.js
- Google Cloud account
- Cloudinary account
- Akamai account

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/product-image-api.git
   cd product-image-api
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add your Cloudinary and Google Cloud credentials:
   ```plaintext
   CLOUDINARY_URL=your_cloudinary_url
   GOOGLE_CLOUD_PROJECT=your_project_id
   ```

### Deployment

To deploy the service to Google Cloud, follow these steps:

1. Build the application:
   ```bash
   npm run build
   ```

2. Deploy to Google Cloud:
   ```bash
   gcloud app deploy
   ```

3. Update Akamai:
   Update your Akamai origin settings to point to the new service endpoint.

## API Endpoints

### Get Product Image Sets

- **Endpoint**: `GET /api/images/:productId`
- **Description**: Retrieve the image sets for a specific product.
- **Parameters**:
  - `productId`: The ID of the product for which to fetch images.
  
- **Response**:
  - A JSON object containing the image set for the specified product.

### Example Request

```bash
curl -X GET "https://your-service-url/api/images/product123"
```

### Example Response

```
expressfashion/0094_07858364_0011_e2_v001,expressfashion/0094_07858364_0011_f001,expressfashion/0094_07858364_0011_f002,expressfashion/0094_07858364_0011_f003,expressfashion/0094_07858364_0011_e1_f001,expressfashion/0094_07858364_0011_e1_f002,expressfashion/0094_07858364_0011_e2_f001,expressfashion/0094_07858364_0011_e2_f002,expressfashion/0094_07858364_0011_a001,expressfashion/0094_07858364_0011_9_fb
```

## Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/YourFeature`).
3. Make your changes and commit them (`git commit -m 'Add your feature'`).
4. Push to the branch (`git push origin feature/YourFeature`).
5. Create a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

## Contact

For questions or support, please reach out to [manjunath.kalburgi@ariessolutions.io].

Feel free to customize the placeholders and any other details as needed!
