FROM node:16-alpine

WORKDIR /pixellegion

# https://stackoverflow.com/questions/71297042/react-hot-reload-doesnt-work-in-docker-container
ENV WATCHPACK_POLLING=true
# https://stackoverflow.com/questions/61576659/how-to-hot-reload-in-reactjs-docker
ENV WDS_SOCKET_PORT=8001

COPY package.json .
COPY yarn.lock .

RUN yarn install
# docker build -t pixellegion .
# docker run -p 3000:3000 -v C:/Users/<USER>/Desktop/Workspace/PixelLegion-NFT/PixelLegion-3-front-end/:/pixellegion/ -it pixellegion sh