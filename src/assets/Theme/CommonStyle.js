import { FontFamily } from "../FontFamily/Fonts";
import Colors from "./Colors";
import FontSize from "./FontSize";


export default{
    text:{
        text_20_500_f:{
            fontWeight:'500',
            fontSize:FontSize.size.h20,
            color:Colors.white,
            fontFamily:FontFamily.poppins_black,
        },
        text_14_400_f:{
            fontWeight:'400',
            fontSize:FontSize.size.h14,
            color:Colors.white,
            fontFamily:FontFamily.poppins_regular,
        },
    },
    depthShadow: {
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.11,
        shadowRadius: 2.22,
        elevation: 3,
      },
   
}