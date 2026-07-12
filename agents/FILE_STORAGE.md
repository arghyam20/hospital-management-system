# File Storage

## Overview
The HMS needs to handle unstructured data such as:
- User profile pictures.
- Laboratory report PDFs.
- Scanned medical documents.

## Cloud Storage Strategy
- Files are **NEVER** stored as BLOBs in the MySQL databases.
- Files are stored in an S3-compatible object storage service (AWS S3, MinIO for on-premise/local dev).
- The databases only store the URL/URI pointing to the object in the storage bucket.

## Upload Flow
1. Client requests a pre-signed upload URL from the API Gateway.
2. API Gateway validates permissions and generates a time-limited pre-signed URL via the target service (e.g., `laboratory-service`).
3. Client uploads the file directly to S3 using the pre-signed URL (bypassing the Node.js servers entirely to save bandwidth and memory).
4. Client notifies the backend that the upload is complete, passing the object key.
5. Backend updates the database record (e.g., `Report.fileUrl`).

## Security
- All S3 buckets containing PHI are strictly private.
- To view a file, the client must request a pre-signed read URL, ensuring that authorization is checked before granting access to the document.
