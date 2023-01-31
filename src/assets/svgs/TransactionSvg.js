/* eslint-disable complexity */
import React from 'react';
import { Svg, Path } from 'react-native-svg';

import { useTheme } from 'contexts/ThemeContext';
import { MODULE_COMMAND_NAMES } from 'modules/Transactions/constants';
import { themes, colors } from 'constants/styleGuide';

export default function TransactionSvg({
  height = 20,
  width = 20,
  style,
  moduleCommand = MODULE_COMMAND_NAMES.tokenTransfer,
}) {
  const { theme } = useTheme();

  let children;

  const bgColor = theme === themes.light ? colors.light.zodiacBlue : colors.dark.inkBlue;
  const color = theme === themes.light ? colors.light.platinumGray : colors.dark.white;

  switch (moduleCommand) {
    case MODULE_COMMAND_NAMES.tokenTransfer:
    case MODULE_COMMAND_NAMES.tokenCrossChaintransfer:
      children = (
        <>
          <Path
            d="M10 20C4.47715 20 0 15.5228 0 10C0 4.47715 4.47715 0 10 0C15.5228 0 20 4.47715 20 10C20 15.5228 15.5228 20 10 20Z"
            fill={bgColor}
          />
          <Path
            d="M7.21637 5.87312L5.91599 7.19965H11.5167C11.7321 7.19965 11.9067 7.37426 11.9067 7.58965C11.9067 7.80504 11.7321 7.97965 11.5167 7.97965H5.91402L7.21636 9.30822C7.36714 9.46203 7.36713 9.71142 7.21635 9.86523C7.06557 10.019 6.82111 10.019 6.67033 9.86523L4.71367 7.86915C4.64126 7.79528 4.60059 7.6951 4.60059 7.59064C4.60059 7.48618 4.64127 7.386 4.71367 7.31214L6.67035 5.3161C6.82113 5.16229 7.06559 5.16229 7.21637 5.31611C7.36715 5.46992 7.36715 5.71931 7.21637 5.87312Z"
            fill={color}
          />
          <Path
            d="M12.7833 10.6917L14.0836 12.0183H8.48299C8.2676 12.0183 8.09299 12.1929 8.09299 12.4083C8.09299 12.6236 8.2676 12.7983 8.48299 12.7983H14.0856L12.7833 14.1268C12.6325 14.2806 12.6325 14.53 12.7833 14.6838C12.9341 14.8376 13.1785 14.8376 13.3293 14.6838L15.286 12.6878C15.3584 12.6139 15.399 12.5137 15.399 12.4092C15.399 12.3048 15.3584 12.2046 15.286 12.1307L13.3293 10.1347C13.1785 9.98089 12.934 9.9809 12.7833 10.1347C12.6325 10.2885 12.6325 10.5379 12.7833 10.6917Z"
            fill={color}
          />
        </>
      );
      break;

    case MODULE_COMMAND_NAMES.registerMultisignatureGroup:
    case MODULE_COMMAND_NAMES.updateGeneratorKey:
    case MODULE_COMMAND_NAMES.registerkeys:
      children = (
        <>
          <Path
            d="M10 20C4.47715 20 0 15.5228 0 10C0 4.47715 4.47715 0 10 0C15.5228 0 20 4.47715 20 10C20 15.5228 15.5228 20 10 20Z"
            fill={bgColor}
          />
          <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M6.59077 7.52805C6.49238 7.10439 6.75605 6.68119 7.1797 6.58279C7.60335 6.4844 8.02656 6.74807 8.12495 7.17172C8.22335 7.59537 7.95968 8.01858 7.53603 8.11697C7.11237 8.21537 6.68917 7.9517 6.59077 7.52805ZM7.28829 7.05035C7.12287 7.08877 7.01991 7.25402 7.05833 7.41945C7.09675 7.58488 7.262 7.68784 7.42743 7.64942C7.59286 7.611 7.69582 7.44574 7.6574 7.28031C7.61898 7.11488 7.45372 7.01193 7.28829 7.05035Z"
            fill={color}
          />
          <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M6.52425 5.57754C5.12492 6.10853 4.29882 7.60538 4.64682 9.10367C4.93936 10.3632 5.9007 11.2961 7.13152 11.4536L7.3877 12.5566C7.40657 12.6379 7.45779 12.7079 7.5295 12.7505L7.87804 12.9575L7.65836 13.2954C7.56364 13.441 7.60908 13.6362 7.75838 13.7251L8.10412 13.9309L7.81128 14.3804L7.95272 14.9893C7.96816 15.0558 8.00539 15.1152 8.05849 15.1581L8.92321 15.8567C9.13571 16.0284 9.45296 15.9547 9.56805 15.7069L10.0198 14.7343C10.0593 14.6494 10.0692 14.5536 10.048 14.4624L9.23969 10.982C9.85844 10.6352 10.2848 10.1027 10.4979 9.47746C10.6443 9.39225 10.7838 9.29234 10.9144 9.17799L11.8425 9.6746C11.916 9.71395 12.0025 9.72157 12.0817 9.6957L12.4265 9.58324L12.5242 9.92992C12.5714 10.0972 12.7481 10.1916 12.9134 10.1379L13.2553 10.0267L13.3888 10.502L13.9139 10.783C13.9741 10.8152 14.0434 10.8263 14.1106 10.8146L15.1318 10.6375C15.401 10.5908 15.5546 10.3036 15.4441 10.0538L15.0408 9.1418C15.0029 9.05611 14.9374 8.98556 14.8548 8.94136L11.9053 7.36318C12.1562 6.14903 11.5465 5.00951 10.4134 4.40323C9.01479 3.65487 7.27466 4.18071 6.52425 5.57754ZM7.39296 5.38593C8.85753 5.28136 10.2217 6.25376 10.5644 7.72927C10.6327 8.02322 10.662 8.31486 10.6539 8.59781C10.7556 8.49662 10.9124 8.48303 11.0289 8.55876L12.0149 9.08638L12.5315 8.91788C12.6968 8.86396 12.8738 8.95843 12.921 9.12577L13.0188 9.47272L13.361 9.36145C13.5263 9.30769 13.7032 9.40232 13.7502 9.56971L13.8973 10.0936L14.1078 10.2062L14.8022 10.0857L14.5171 9.44115L11.4405 7.79494C11.3008 7.73636 11.2251 7.58064 11.2695 7.43234C11.5676 6.43712 11.1194 5.46148 10.1304 4.93227C9.20036 4.43466 8.07957 4.64898 7.39296 5.38593ZM5.23126 8.96793C4.9267 7.65662 5.74283 6.34669 7.05414 6.04213C8.36546 5.73756 9.67539 6.55369 9.97995 7.86501C10.2515 9.0342 9.78228 10.0857 8.76849 10.5488C8.62756 10.6132 8.56038 10.773 8.60855 10.9167L9.44957 14.5378L9.12098 15.2451L8.51426 14.755L8.45357 14.4937L8.77397 14.0019C8.86889 13.8563 8.82351 13.6609 8.6741 13.5719L8.32812 13.366L8.54796 13.0279C8.64274 12.8821 8.59717 12.6868 8.44769 12.598L7.94376 12.2987L7.67286 11.1323C7.65333 10.9923 7.53649 10.8815 7.3901 10.8745C6.34564 10.8244 5.48752 10.0713 5.23126 8.96793Z"
            fill={color}
          />
        </>
      );
      break;

    case MODULE_COMMAND_NAMES.registerDelegate:
      children = (
        <>
          <Path
            d="M10 20C4.47715 20 0 15.5228 0 10C0 4.47715 4.47715 0 10 0C15.5228 0 20 4.47715 20 10C20 15.5228 15.5228 20 10 20Z"
            fill={bgColor}
          />
          <Path
            d="M13.8456 5.14601C13.8456 4.84446 13.6012 4.60001 13.2996 4.60001C12.9981 4.60001 12.7536 4.84446 12.7536 5.14601V6.15399H11.7456C11.4441 6.15399 11.1996 6.39844 11.1996 6.69999C11.1996 7.00153 11.4441 7.24599 11.7456 7.24599H12.7536V8.25401C12.7536 8.55555 12.9981 8.80001 13.2996 8.80001C13.6012 8.80001 13.8456 8.55555 13.8456 8.25401V7.24599H14.8536C15.1552 7.24599 15.3996 7.00153 15.3996 6.69999C15.3996 6.39844 15.1552 6.15399 14.8536 6.15399H13.8456V5.14601Z"
            fill="white"
          />
          <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M9.09961 6.40001C7.85697 6.40001 6.84961 7.40737 6.84961 8.65001C6.84961 9.89265 7.85697 10.9 9.09961 10.9C10.3422 10.9 11.3496 9.89265 11.3496 8.65001C11.3496 7.40737 10.3422 6.40001 9.09961 6.40001ZM7.62961 8.65001C7.62961 7.83815 8.28775 7.18001 9.09961 7.18001C9.91147 7.18001 10.5696 7.83815 10.5696 8.65001C10.5696 9.46186 9.91147 10.12 9.09961 10.12C8.28775 10.12 7.62961 9.46186 7.62961 8.65001Z"
            fill="white"
          />
          <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M9.09961 11.65C10.2931 11.65 11.4377 12.0451 12.2816 12.7484C12.8437 13.2168 13.2417 13.7963 13.4449 14.425C13.4657 14.4896 13.4845 14.5546 13.5012 14.62C13.5662 14.8745 13.5996 15.1359 13.5996 15.4H4.59961C4.59961 15.1359 4.63306 14.8745 4.69801 14.62C4.71472 14.5546 4.73351 14.4895 4.75436 14.425C4.95752 13.7963 5.35555 13.2168 5.91763 12.7484C6.76154 12.0451 7.90614 11.65 9.09961 11.65ZM6.41697 13.3476C5.97322 13.7174 5.67025 14.159 5.51153 14.62H12.6877C12.529 14.159 12.226 13.7174 11.7822 13.3476C11.091 12.7716 10.1275 12.43 9.09961 12.43C8.07168 12.43 7.10823 12.7716 6.41697 13.3476Z"
            fill="white"
          />
        </>
      );
      break;

    case MODULE_COMMAND_NAMES.reportDelegateMisbehavior:
      children = (
        <>
          <Path
            d="M10 20C4.47715 20 0 15.5228 0 10C0 4.47715 4.47715 0 10 0C15.5228 0 20 4.47715 20 10C20 15.5228 15.5228 20 10 20Z"
            fill={bgColor}
          />
          <Path
            d="M9.61031 8.59001C9.61031 8.37462 9.78492 8.20001 10.0003 8.20001C10.2157 8.20001 10.3903 8.37462 10.3903 8.59001V11.41C10.3903 11.6254 10.2157 11.8 10.0003 11.8C9.78492 11.8 9.61031 11.6254 9.61031 11.41V8.59001Z"
            fill={color}
          />
          <Path
            d="M9.61031 12.79C9.61031 12.5746 9.78492 12.4 10.0003 12.4C10.2157 12.4 10.3903 12.5746 10.3903 12.79C10.3903 13.0054 10.2157 13.18 10.0003 13.18C9.78492 13.18 9.61031 13.0054 9.61031 12.79Z"
            fill={color}
          />
          <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M8.99436 5.80001C9.4598 5.00001 10.6234 5.00001 11.0888 5.80001L15.2778 13C15.7432 13.8 15.1614 14.8 14.2306 14.8H5.85265C4.92177 14.8 4.33997 13.8 4.80541 13L8.99436 5.80001ZM10.4081 6.19001L14.5971 13.39C14.76 13.67 14.5564 14.02 14.2306 14.02H5.85265C5.52684 14.02 5.32321 13.67 5.48612 13.39L9.67507 6.19001C9.83797 5.91001 10.2452 5.91001 10.4081 6.19001Z"
            fill={color}
          />
        </>
      );
      break;

    case MODULE_COMMAND_NAMES.stake:
      children = (
        <>
          <Path
            d="M10 20C4.47715 20 0 15.5228 0 10C0 4.47715 4.47715 0 10 0C15.5228 0 20 4.47715 20 10C20 15.5228 15.5228 20 10 20Z"
            fill={bgColor}
          />
          <Path
            d="M12.3775 4.97774C12.6209 5.19012 12.8241 5.44527 12.9831 5.7439L12.3965 6.33049C12.2652 6.00325 12.0807 5.75399 11.8646 5.56538C11.4175 5.17515 10.773 4.98999 9.99976 4.98999C9.22655 4.98999 8.58199 5.17515 8.1349 5.56538C7.72791 5.92062 7.43317 6.49099 7.39417 7.39239H11.3346L10.5546 8.17239H6.69977C6.13644 8.17239 5.67977 8.62906 5.67977 9.19239V13.0472L4.96074 13.7662C4.92097 13.6175 4.89977 13.4612 4.89977 13.3V9.19239C4.89977 8.22719 5.65945 7.43943 6.61351 7.39442C6.65344 6.31243 7.01164 5.51048 7.62199 4.97774C8.26069 4.42026 9.11612 4.20999 9.99976 4.20999C10.8834 4.20999 11.7388 4.42026 12.3775 4.97774Z"
            fill={color}
          />
          <Path
            d="M9.60977 11.8297C9.56913 11.8158 9.52948 11.7997 9.49095 11.7816L10.2209 11.0516C10.2761 11.0174 10.3227 10.9708 10.3569 10.9157L11.0869 10.1857C11.1593 10.3402 11.1998 10.5126 11.1998 10.6945C11.1998 11.2207 10.8611 11.6678 10.3898 11.8297V13C10.3898 13.2154 10.2152 13.39 9.99976 13.39C9.78437 13.39 9.60977 13.2154 9.60977 13V11.8297Z"
            fill={color}
          />
          <Path
            d="M13.2998 14.32H6.95259L6.23355 15.039C6.38225 15.0788 6.53853 15.1 6.69977 15.1H13.2998C14.2939 15.1 15.0998 14.2941 15.0998 13.3V9.19239C15.0998 8.37461 14.5544 7.6842 13.8076 7.46501L13.1002 8.17239H13.2998C13.8631 8.17239 14.3198 8.62906 14.3198 9.19239V13.3C14.3198 13.8633 13.8631 14.32 13.2998 14.32Z"
            fill={color}
          />
          <Path
            d="M15.0755 5.47578C15.2278 5.32347 15.2278 5.07654 15.0755 4.92423C14.9232 4.77193 14.6763 4.77193 14.524 4.92423L4.62399 14.8242C4.47169 14.9765 4.47169 15.2235 4.62399 15.3758C4.7763 15.5281 5.02323 15.5281 5.17554 15.3758L15.0755 5.47578Z"
            fill={color}
          />
        </>
      );
      break;

    case MODULE_COMMAND_NAMES.voteDelegate:
      children = (
        <>
          <Path
            d="M10 20C4.47715 20 0 15.5228 0 10C0 4.47715 4.47715 0 10 0C15.5228 0 20 4.47715 20 10C20 15.5228 15.5228 20 10 20Z"
            fill={bgColor}
          />
          <Path
            d="M15.2831 5.57976C15.4384 5.42425 15.4384 5.17213 15.2831 5.01662C15.1278 4.86112 14.876 4.86112 14.7206 5.01662L12.8602 6.87919L12.2236 6.24184C12.0683 6.08634 11.8165 6.08634 11.6611 6.24184C11.5058 6.39735 11.5058 6.64947 11.6611 6.80498L12.579 7.72389C12.7343 7.8794 12.9861 7.8794 13.1415 7.72389L15.2831 5.57976Z"
            fill={color}
          />
          <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M6.89422 8.20808C6.89422 6.93933 7.92156 5.9108 9.18884 5.9108C10.4561 5.9108 11.4835 6.93933 11.4835 8.20808C11.4835 9.47684 10.4561 10.5054 9.18884 10.5054C7.92156 10.5054 6.89422 9.47684 6.89422 8.20808ZM9.18884 6.6908C8.35319 6.6908 7.67422 7.36925 7.67422 8.20808C7.67422 9.04691 8.35319 9.72537 9.18884 9.72537C10.0245 9.72537 10.7035 9.04691 10.7035 8.20808C10.7035 7.36925 10.0245 6.6908 9.18884 6.6908Z"
            fill={color}
          />
          <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M4.69583 14.32C4.63231 14.5747 4.59961 14.8359 4.59961 15.1H13.7781C13.7781 14.8359 13.7454 14.5747 13.6819 14.32C13.6638 14.2476 13.6433 14.1757 13.6203 14.1045C13.4131 13.4626 13.0071 12.8708 12.4339 12.3926C11.5733 11.6746 10.406 11.2712 9.18884 11.2712C7.9717 11.2712 6.80441 11.6746 5.94377 12.3926C5.37054 12.8708 4.96462 13.4626 4.75743 14.1045C4.73443 14.1757 4.71389 14.2476 4.69583 14.32ZM12.8701 14.32C12.7092 13.8381 12.3958 13.3766 11.9342 12.9915C11.2262 12.4008 10.2402 12.0512 9.18884 12.0512C8.13748 12.0512 7.15146 12.4008 6.44345 12.9915C5.98185 13.3766 5.66846 13.8381 5.50763 14.32H12.8701Z"
            fill={color}
          />
        </>
      );
      break;

    default:
      break;
  }

  return (
    <Svg
      width={style?.width || width}
      height={style?.height || height}
      viewBox="0 0 20 20"
      fill="none"
      style={style}
    >
      {children}
    </Svg>
  );
}
