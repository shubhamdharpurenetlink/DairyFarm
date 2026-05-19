import type { ThemeConfig } from "antd";

export const antdTheme: ThemeConfig = {
  token: {
    colorPrimary: "#2E7D5B",
    colorSuccess: "#52c41a",
    colorWarning: "#faad14",
    colorError: "#ff4d4f",
    colorInfo: "#1677ff",

    colorBgBase: "#FAFAF7",
    colorBgContainer: "#FFFFFF",
    colorBgLayout: "#FAFAF7",
    colorBgElevated: "#FFFFFF",

    colorText: "#1A1A1A",
    colorTextSecondary: "#5A5A5A",
    colorTextTertiary: "#8A8A8A",

    colorBorder: "#E8E8E3",
    colorBorderSecondary: "#F0F0EB",

    fontFamily:
      "'Inter', 'Hind', system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
    fontSize: 16,
    fontSizeHeading1: 56,
    fontSizeHeading2: 40,
    fontSizeHeading3: 28,
    fontSizeHeading4: 22,
    fontSizeHeading5: 18,

    borderRadius: 8,
    borderRadiusLG: 12,
    borderRadiusSM: 6,

    controlHeight: 44,
    controlHeightLG: 52,
    controlHeightSM: 36,

    boxShadow: "0 2px 8px rgba(46, 125, 91, 0.06)",
    boxShadowSecondary: "0 4px 16px rgba(46, 125, 91, 0.08)",

    wireframe: false,
    motion: true,
  },
  components: {
    Button: {
      fontWeight: 600,
      paddingInline: 24,
      paddingInlineLG: 32,
      primaryShadow: "0 4px 16px rgba(46, 125, 91, 0.24)",
    },
    Card: {
      borderRadiusLG: 16,
      paddingLG: 24,
      headerFontSize: 18,
    },
    Input: {
      paddingBlock: 10,
      paddingInline: 14,
    },
    Form: {
      labelFontSize: 14,
      labelColor: "#1A1A1A",
      verticalLabelPadding: "0 0 6px 0",
    },
    Menu: {
      itemBorderRadius: 8,
      itemHeight: 44,
      iconSize: 18,
    },
    Table: {
      headerBg: "#F5F5F1",
      headerColor: "#1A1A1A",
      borderColor: "#E8E8E3",
    },
    Tag: {
      defaultBg: "#F5E6C8",
      defaultColor: "#5A5A5A",
    },
    Tabs: {
      itemActiveColor: "#2E7D5B",
      itemHoverColor: "#2E7D5B",
      itemSelectedColor: "#2E7D5B",
      inkBarColor: "#2E7D5B",
    },
    Steps: {
      colorPrimary: "#2E7D5B",
    },
  },
};
