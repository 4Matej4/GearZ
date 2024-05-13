import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Path, Svg } from 'react-native-svg';
import { horizontalScale, verticalScale, moderateScale } from '../Metric';

const SVGbckg = ({ children, style }) => {
    return (
        <View style={styles.wrapper}>
            <Svg
                height="100%"
                width="100%"
                viewBox={`0 0 400 800`}
            >
                <Path
                    fill="rgba(64, 91, 255, 0.6)"
                    d="M 31.00,0.00
          C 31.00,0.00 38.00,0.00 38.00,0.00
            38.00,0.00 38.00,42.00 38.00,42.00
            38.00,42.00 37.00,61.00 37.00,61.00
            37.00,61.00 65.00,49.15 65.00,49.15
            65.00,49.15 155.00,12.20 155.00,12.20
            167.62,7.15 190.72,-4.27 204.00,1.00
            204.00,1.00 173.00,13.19 173.00,13.19
            173.00,13.19 81.00,50.20 81.00,50.20
            81.00,50.20 49.00,63.58 49.00,63.58
            45.53,65.03 38.94,66.97 37.02,70.21
            35.92,72.07 35.11,85.98 34.96,89.00
            34.96,89.00 31.93,120.00 31.93,120.00
            31.93,120.00 25.28,174.00 25.28,174.00
            25.28,174.00 17.00,230.00 17.00,230.00
            17.00,230.00 70.00,219.00 70.00,219.00
            70.00,219.00 188.00,194.61 188.00,194.61
            188.00,194.61 237.00,186.25 237.00,186.25
            237.00,186.25 257.79,182.15 257.79,182.15
            257.79,182.15 266.25,168.00 266.25,168.00
            266.25,168.00 283.25,135.00 283.25,135.00
            283.25,135.00 324.30,48.00 324.30,48.00
            324.30,48.00 344.00,0.00 344.00,0.00
            344.00,0.00 352.00,0.00 352.00,0.00
            352.00,0.00 341.42,27.00 341.42,27.00
            341.42,27.00 317.78,80.00 317.78,80.00
            317.78,80.00 278.78,159.00 278.78,159.00
            278.78,159.00 267.00,182.00 267.00,182.00
            267.00,182.00 307.00,177.17 307.00,177.17
            307.00,177.17 336.00,174.91 336.00,174.91
            336.00,174.91 346.00,174.00 346.00,174.00
            346.00,174.00 371.00,173.00 371.00,173.00
            371.00,173.00 393.00,172.00 393.00,172.00
            393.00,172.00 393.00,179.00 393.00,179.00
            393.00,179.00 377.00,180.00 377.00,180.00
            351.96,180.04 326.90,182.34 302.00,184.83
            302.00,184.83 276.00,187.72 276.00,187.72
            272.78,188.14 267.88,188.31 265.10,189.98
            261.05,192.42 256.07,204.36 253.75,209.00
            253.75,209.00 230.75,255.00 230.75,255.00
            230.75,255.00 173.69,374.00 173.69,374.00
            166.55,389.59 148.09,433.81 144.00,449.00
            171.11,453.94 198.48,456.13 226.00,456.00
            226.00,456.00 237.00,455.09 237.00,455.09
            237.00,455.09 263.00,452.72 263.00,452.72
            266.06,452.32 275.54,451.22 277.73,449.83
            281.10,447.69 284.51,436.11 286.05,432.00
            286.05,432.00 304.25,390.00 304.25,390.00
            304.25,390.00 320.26,357.00 320.26,357.00
            320.26,357.00 362.70,279.00 362.70,279.00
            362.70,279.00 382.14,244.00 382.14,244.00
            385.12,238.67 389.09,230.30 393.00,226.00
            393.00,226.00 392.35,240.00 392.35,240.00
            392.35,240.00 378.86,265.00 378.86,265.00
            378.86,265.00 358.30,302.00 358.30,302.00
            358.30,302.00 315.78,382.00 315.78,382.00
            315.78,382.00 296.42,425.00 296.42,425.00
            296.42,425.00 287.00,449.00 287.00,449.00
            287.00,449.00 300.00,446.12 300.00,446.12
            300.00,446.12 345.00,433.98 345.00,433.98
            345.00,433.98 393.00,418.00 393.00,418.00
            392.97,420.00 393.15,422.80 391.98,424.50
            390.67,426.40 387.12,427.55 385.00,428.31
            385.00,428.31 368.00,434.00 368.00,434.00
            368.00,434.00 308.00,451.37 308.00,451.37
            303.03,452.61 287.61,454.84 284.84,458.30
            283.33,460.18 280.87,468.29 280.02,471.00
            280.02,471.00 271.88,502.00 271.88,502.00
            265.72,528.80 264.52,550.16 261.83,577.00
            261.83,577.00 257.83,616.00 257.83,616.00
            257.83,616.00 256.00,633.00 256.00,633.00
            256.00,633.00 307.00,618.98 307.00,618.98
            336.13,609.92 364.69,598.32 393.00,587.00
            392.99,589.18 393.24,592.68 391.98,594.50
            390.55,596.57 385.40,598.24 383.00,599.20
            383.00,599.20 362.00,607.40 362.00,607.40
            338.46,616.74 314.36,624.96 290.00,631.86
            281.58,634.25 263.00,639.63 255.00,640.00
            255.00,640.00 253.17,658.00 253.17,658.00
            253.17,658.00 249.83,691.00 249.83,691.00
            249.83,691.00 246.16,719.00 246.16,719.00
            246.16,719.00 236.17,812.00 236.17,812.00
            236.17,812.00 232.00,851.00 232.00,851.00
            232.00,851.00 225.00,851.00 225.00,851.00
            225.00,851.00 228.84,812.00 228.84,812.00
            228.84,812.00 238.84,725.00 238.84,725.00
            238.84,725.00 244.84,668.00 244.84,668.00
            244.84,668.00 248.00,642.00 248.00,642.00
            210.89,648.76 179.43,652.29 142.00,644.80
            132.50,642.90 120.84,639.88 112.00,636.00
            112.00,636.00 104.91,679.00 104.91,679.00
            104.91,679.00 86.25,783.00 86.25,783.00
            86.25,783.00 77.00,834.00 77.00,834.00
            77.00,834.00 102.00,851.00 102.00,851.00
            88.61,851.00 86.48,851.90 76.00,842.00
            74.29,851.04 74.22,850.97 66.00,851.00
            66.00,851.00 67.88,838.42 67.88,838.42
            67.88,838.42 61.00,830.72 61.00,830.72
            61.00,830.72 47.17,817.28 47.17,817.28
            47.17,817.28 14.20,781.00 14.20,781.00
            14.20,781.00 0.58,763.00 0.58,763.00
            0.58,763.00 0.00,752.00 0.00,752.00
            0.00,752.00 18.27,773.00 18.27,773.00
            18.27,773.00 52.00,810.00 52.00,810.00
            52.00,810.00 71.00,827.00 71.00,827.00
            71.00,827.00 76.39,795.00 76.39,795.00
            76.39,795.00 87.39,736.00 87.39,736.00
            87.39,736.00 97.57,679.00 97.57,679.00
            97.57,679.00 105.00,633.00 105.00,633.00
            97.66,631.28 85.08,624.79 78.00,621.25
            62.06,613.25 37.82,598.19 23.00,587.98
            19.13,585.31 2.68,574.55 1.02,571.70
            -0.29,569.45 0.00,565.59 0.00,563.00
            0.00,563.00 39.00,589.31 39.00,589.31
            65.24,606.21 78.12,612.85 106.00,626.00
            106.00,626.00 111.84,581.00 111.84,581.00
            114.66,554.60 116.69,528.06 122.00,502.00
            122.00,502.00 127.15,480.00 127.15,480.00
            127.15,480.00 134.00,454.00 134.00,454.00
            134.00,454.00 97.00,446.37 97.00,446.37
            97.00,446.37 32.00,428.28 32.00,428.28
            32.00,428.28 0.00,419.00 0.00,419.00
            0.00,419.00 0.00,411.00 0.00,411.00
            33.14,422.04 67.12,431.67 101.00,440.13
            101.00,440.13 137.00,448.00 137.00,448.00
            137.00,448.00 147.95,416.00 147.95,416.00
            157.87,389.38 170.10,363.66 182.22,338.00
            182.22,338.00 222.74,255.00 222.74,255.00
            222.74,255.00 255.00,191.00 255.00,191.00
            255.00,191.00 185.00,202.39 185.00,202.39
            185.00,202.39 76.00,224.65 76.00,224.65
            76.00,224.65 33.00,234.12 33.00,234.12
            28.80,235.09 19.23,236.13 16.59,239.30
            14.92,241.32 14.49,245.42 14.13,248.00
            14.13,248.00 11.59,265.00 11.59,265.00
            11.59,265.00 4.08,313.00 4.08,313.00
            3.15,318.62 1.90,331.56 0.00,336.00
            0.00,336.00 0.00,299.00 0.00,299.00
            0.00,299.00 4.92,263.00 4.92,263.00
            4.92,263.00 9.00,240.00 9.00,240.00
            9.00,240.00 8.00,239.00 8.00,239.00
            8.00,239.00 0.00,241.00 0.00,241.00
            0.00,241.00 0.00,234.00 0.00,234.00
            0.00,234.00 8.42,231.27 8.42,231.27
            8.42,231.27 11.27,221.00 11.27,221.00
            11.27,221.00 15.08,196.00 15.08,196.00
            15.08,196.00 24.16,126.00 24.16,126.00
            24.16,126.00 29.00,72.00 29.00,72.00
            29.00,72.00 0.00,84.00 0.00,84.00
            0.01,81.94 -0.26,78.39 0.99,76.70
            2.55,74.59 17.60,69.01 21.00,67.58
            23.98,66.32 28.00,65.02 29.42,61.87
            31.27,57.75 31.00,45.87 31.00,41.00
            31.00,41.00 31.00,0.00 31.00,0.00 Z
          M 277.00,458.00
          C 277.00,458.00 255.00,460.83 255.00,460.83
            255.00,460.83 211.00,463.00 211.00,463.00
            211.00,463.00 199.00,462.00 199.00,462.00
            199.00,462.00 190.00,462.00 190.00,462.00
            190.00,462.00 161.00,458.72 161.00,458.72
            161.00,458.72 141.00,456.00 141.00,456.00
            141.00,456.00 134.88,478.00 134.88,478.00
            134.88,478.00 126.43,517.00 126.43,517.00
            126.43,517.00 119.00,581.00 119.00,581.00
            119.00,581.00 114.73,614.00 114.73,614.00
            114.34,616.74 112.62,625.45 113.59,627.58
            114.66,629.95 118.70,630.90 121.00,631.67
            121.00,631.67 142.00,637.40 142.00,637.40
            170.03,643.04 193.80,642.80 222.00,638.87
            222.00,638.87 241.00,635.92 241.00,635.92
            243.09,635.56 246.62,635.19 247.98,633.42
            249.33,631.64 249.89,620.80 250.17,618.00
            250.17,618.00 254.17,579.00 254.17,579.00
            258.88,530.31 261.21,505.38 277.00,458.00 Z
          M 293.00,850.00
          C 293.00,850.00 364.00,830.29 364.00,830.29
            364.00,830.29 393.00,823.00 393.00,823.00
            393.00,823.00 391.98,829.44 391.98,829.44
            391.98,829.44 385.00,832.42 385.00,832.42
            385.00,832.42 370.00,836.58 370.00,836.58
            370.00,836.58 336.00,846.42 336.00,846.42
            336.00,846.42 315.00,851.00 315.00,851.00
            315.00,851.00 293.00,850.00 293.00,850.00 Z"
                />
            </Svg>
            <View style={styles.glassEffect}>
                {children}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        width: horizontalScale(393),
        height:  verticalScale(852)
    },
    glassEffect: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        shadowColor: "rgba(0,0,0, 0.1)",
        shadowOffset: { width: horizontalScale(0), height: verticalScale(4) },
        shadowRadius: moderateScale(30),
        shadowOpacity: 1,
      },
})

export default SVGbckg;
