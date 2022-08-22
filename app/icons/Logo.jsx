export default function Logo({ size = 18, ...otherProps }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      fill="currentColor"
      width={size}
      height={size}
      {...otherProps}
    >
      <rect width="512" height="512" rx="79" fill="black" />
      <g clipPath="url(#clip0_509_2)">
        <path
          d="M331.969 193.864L296.433 123.453V107.234H298.39C301.634 107.234 304.263 104.606 304.263 101.362V77.8723C304.263 74.6285 301.634 72 298.39 72H213.61C210.366 72 207.737 74.6285 207.737 77.8723V101.362C207.737 104.606 210.366 107.234 213.61 107.234H215.567V123.453L180.031 193.864C175.721 202.402 172.345 216.583 172.345 226.148V418.468C172.345 430.34 182.004 440 193.877 440H318.122C329.995 440 339.654 430.34 339.654 418.468V226.148C339.654 216.582 336.279 202.402 331.969 193.864ZM219.482 83.7447H292.517V95.4894H219.482V83.7447ZM226.682 127.497C227.096 126.676 227.312 125.77 227.312 124.851V107.234H284.688V124.851C284.688 125.77 284.903 126.676 285.317 127.497L307.666 171.777C303.429 173.15 300.459 175.365 297.889 177.286C294.403 179.893 291.884 181.775 286.268 181.775C280.653 181.775 278.134 179.893 274.648 177.286C270.58 174.245 265.516 170.46 255.995 170.46C246.475 170.46 241.412 174.245 237.344 177.287C233.859 179.893 231.341 181.775 225.726 181.775C220.111 181.775 217.593 179.893 214.108 177.287C211.539 175.366 208.569 173.151 204.333 171.777L226.682 127.497V127.497ZM327.91 418.468C327.91 423.865 323.519 428.255 318.122 428.255H193.878C188.481 428.255 184.09 423.865 184.09 418.468V226.148C184.09 218.417 187.033 206.056 190.516 199.154L198.922 182.499C202.293 183.123 204.402 184.693 207.077 186.692C211.145 189.734 216.208 193.52 225.728 193.52C235.247 193.52 240.311 189.734 244.378 186.692C247.863 184.087 250.381 182.204 255.996 182.204C261.612 182.204 264.13 184.087 267.616 186.693C271.685 189.735 276.748 193.52 286.268 193.52C295.789 193.52 300.852 189.734 304.921 186.693C307.596 184.693 309.706 183.123 313.078 182.499L321.484 199.155C324.966 206.055 327.91 218.417 327.91 226.148V418.468V418.468Z"
          fill="white"
        />
        <path
          d="M201.707 381.277C198.464 381.277 195.835 383.905 195.835 387.149V410.638C195.835 413.882 198.464 416.511 201.707 416.511C204.951 416.511 207.58 413.882 207.58 410.638V387.149C207.58 383.905 204.951 381.277 201.707 381.277Z"
          fill="white"
        />
        <path
          d="M208.89 201.851C205.994 200.39 202.463 201.552 201.001 204.446C198.394 209.612 195.835 220.361 195.835 226.148V363.66C195.835 366.903 198.464 369.532 201.707 369.532C204.951 369.532 207.58 366.903 207.58 363.66V226.148C207.58 222.178 209.697 213.283 211.486 209.739C212.947 206.844 211.784 203.312 208.89 201.851Z"
          fill="white"
        />
        <path
          d="M244.929 130.723H267.071C270.314 130.723 272.943 128.095 272.943 124.851C272.943 121.607 270.314 118.979 267.071 118.979H244.929C241.686 118.979 239.056 121.607 239.056 124.851C239.056 128.095 241.686 130.723 244.929 130.723Z"
          fill="white"
        />
      </g>
      <defs>
        <clipPath id="clip0_509_2">
          <rect
            width="368"
            height="368"
            fill="white"
            transform="translate(72 72)"
          />
        </clipPath>
      </defs>
    </svg>
  );
}
