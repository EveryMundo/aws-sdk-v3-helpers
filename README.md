# @everymundo/aws-sdk-v3-helpers$

# Purpose
This package aims to simplify the usage of aws sdk V3 in our Lambda Functions projects.
This will help you migrate from v2 to v3 and it will make it easier to write tests.

# Install 
Although this is not exclusive for Everymundo Lambda Functions it is written with that in mind. If that's the case you should be using the everymundo packages layer which should already contain this library so you'd install this package as a dev dependency

```sh
npm i -D @everymundo/aws-sdk-v3-helpers
```

If you are not using the lambda layer you should install it as a regular dependency along with the AWS dependency that you need. For s3 for example you can proceed as follows:

```sh
npm i @everymundo/aws-sdk-v3-helpers @aws-sdk/client-s3
```

# Features
For now we support very few commands for S3 and SQS.
Check the code for more

* [S3 Client](s3/client.mjs)
* [S3 Multipart Uploader](s3/uploader.mjs)
* [SQS Client](sqs/client.mjs)