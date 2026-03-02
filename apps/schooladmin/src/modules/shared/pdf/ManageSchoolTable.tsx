'use client';

import {
    Document,
    Page,
    Text,
    View,
    StyleSheet,
} from '@react-pdf/renderer';

interface TablePdfProps {
    columns: string[];
    rows: Record<string, any>[];
}


const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        position: 'relative',
        display: 'flex',
        justifyContent: 'space-between',
        fontSize: '12pt',
    },
    content: {
        flex: 1,
    },
    headerfixed: {
        paddingBottom: '22mm',
    },
    headerfixedall: {
        paddingBottom: '15mm',
    },
    section: {
        width: '100%',
        height: '100%',
    },
    numberData: {
        borderBottomWidth: 1,
        borderBottomColor: '#000',
        borderBottomStyle: 'solid',
        paddingBottom: 4,
        marginBottom: 8,
        color: 'red',
    },
    fSize14: {
        fontSize: '12pt',
    },
    fSize15: {
        fontSize: '11.25pt',
    },
    fSize20: {
        fontSize: '15pt',
    },
    bgContainer: {
        position: 'relative',
        width: '100%',
        height: '100%',
    },
    bgImage: {
        width: '100%',
        height: '100%',
    },
    contentOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    logoTable: {
        width: '90%',
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: '15mm',
        marginLeft: '5%'
    },
    dselLogo: {
        height: '17.89mm',
        width: '133.09mm'
    },
    nicLogo: {
        height: '13.05mm',
        width: '52.46mm'
    },
    progressDetail: {
        width: '40%',
        marginLeft: '30%',
        marginTop: '35mm',
        display: "flex",
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    progressHead: {
        width: '100%',
        fontWeight: 'bold',
        color: 'white',
        textTransform: 'uppercase',
        textAlign: 'center',
        fontSize: '11mm',
        marginBottom: '3mm',
    },
    progressText: {
        backgroundColor: '#013153CC',
        textAlign: 'center',
        padding: '4mm',
        fontSize: '5.292mm',
        color: 'white',
        fontWeight: 'normal',
        textTransform: 'capitalize',
        marginBottom: '3mm',
    },
    progressYear: {
        width: '100%',
        fontWeight: 'bold',
        color: 'white',
        textTransform: 'uppercase',
        textAlign: 'center',
        fontSize: '11mm'
    },
    addressDetail: {
        width: '60%',
        marginLeft: '20%',
        marginTop: '33mm',
        textAlign: 'center',
        fontWeight: 'ultrabold',
        fontSize: '4.44mm',
        color: 'white',
        textTransform: 'uppercase',
        lineHeight: '1.4'
    },
    header: {
        width: '96%',
        marginLeft: '2%',
        top: 12,
        marginBottom: 18,
    },
    headerTable: {
        display: 'flex',
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: 'flex-end',
    },
    headerCenterText: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerTextHead: {
        fontSize: '4.467mm',
        textTransform: 'uppercase',
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'center',
        marginBottom: '3mm',
    },
    headerTextYear: {
        fontSize: '3.44mm',
        textTransform: 'uppercase',
        fontWeight: 'normal',
        color: 'black',
        textAlign: 'center',
    },
    hederLeftLogo: {
        width: '29.392mm',
        height: '13.10mm'
    },
    headerRightLogo: {
        width: '32.54mm'
    },
    reportSection: {
        width: '96%',
        marginLeft: '2%',
    },
    reportext: {
        fontSize: 12,
        color: 'black',
    },
    footer: {
        position: 'absolute',
        width: '96%',
        marginLeft: '2%',
        bottom: 9,
        fontSize: '3mm',
        color: '#000000'
    },
    footerText: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        alignItems: 'center',
    },
    pageNumber: {
        fontSize: '3mm',
        color: '#000000'
    },
    tableSection: {
        marginTop: '3.5mm'
    },
    tableSectionAll: {
        marginTop: '2mm'
    },
    table: {
        display: 'flex',
        width: '100%',
        borderTopWidth: 0.50,
        borderRightWidth: 0.75,
        borderStyle: 'solid',
        borderColor: '#000000',
        fontSize: 9,
        position: 'relative',
    },
    tableRow: {
        flexDirection: 'row',
    },
    tableCol: {
        flex: 1,
        fontSize: '7pt',
        borderBottomWidth: 0.50,
        borderLeftWidth: 0.75,
        borderStyle: 'solid',
        borderColor: '#000000',
        paddingVertical: '1mm',
        paddingHorizontal: '1mm',
        justifyContent: 'center',
        display: 'flex',
        alignItems: 'center',
        textTransform: 'capitalize',
        backgroundColor: 'white',
        width: '4.16%',
        fontWeight: 'light',
        minHeight: "20px",
    },
    cellColspan2: {
        flex: 1,
        paddingVertical: '2mm',
        paddingHorizontal: '2mm',
        fontSize: '8pt',
        backgroundColor: '#FFFFC5',
        fontWeight: 'semibold',
        color: '#000000',
        alignItems: 'flex-start',
        minHeight: "20px",
    },
    cellColspan4: {
        flex: 4,
        paddingVertical: '2mm',
        fontSize: '8pt',
        backgroundColor: '#EFEFEF',
        fontWeight: 'semibold',
        color: '#333333'
    },
    cellColspan5: {
        flex: 8,
        paddingVertical: '2mm',
        paddingHorizontal: '2mm',
        fontSize: '10pt',
        backgroundColor: '#FFFFC5',
        fontWeight: 'semibold',
        color: '#000000',
        alignItems: 'flex-start',
        minHeight: "20px",
    },
    cellColspan19: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        flex: 15,
        paddingVertical: '2mm',
        paddingHorizontal: '2mm',
        fontSize: '9pt',
        backgroundColor: '#C5E3FF',
        fontWeight: 'normal',
        color: '#000000',
        minHeight: "20px",
    },
    tableHeader: {
        backgroundColor: '#C5E3FF'
    },
    tableCounter: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        flex: '19',
    },
    counterItem: {
        display: 'flex',
        flexDirection: 'column',
        alignContent: 'flex-start',
        flex: 1,
        fontWeight: 'light',
        fontSize: '9pt',
        color: '#000000',
    },
    countNum: {
        fontWeight: 'semibold',
    },
    txtCenter: {
        textAlign: 'center',
    },
    txtLeft: {
        textAlign: 'left',
    },
    txtRight: {
        textAlign: 'right',
    },
    stateCell: {
        backgroundColor: '#EFEFEF',
    },
    valueCell: {
        backgroundColor: '#FFFFFF',
    },
    grandTotalRow: {
        backgroundColor: '#EFEFEF',
        fontWeight: 'bold',
        fontSize: '9pt',
    },

    grandTotalLabel: {
        fontSize: '12pt',
        fontWeight: 'extrabold',
    },
    grandTotalValue: {
        fontSize: '12pt',
        fontWeight: 'extrabold',
    },
    grandTotalCol: {
        flex: 5,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        padding: 4,
    },
    statusCell: {
        paddingLeft: 10,
    },

    w15: { width: '15%' },
    w25: { width: '25%' },
    w60: { width: '60%' },
    w75: { width: '75%' }
});

export const ManageSchoolTable = ({ columns, rows }: TablePdfProps) => (
    <Document>
        <Page orientation="landscape" size="A4" style={styles.page}>
            {/* Header */}
            {/* <View style={styles.tableRow}>
                {columns.map((col) => (
                    <Text key={col} style={[styles.cell, styles.header]}>
                        {col}
                    </Text>
                ))}
            </View> */}

            {/* Rows */}
            {rows.map((row: any, index: number) => (
                <View key={index} style={styles.tableRow}>

                    {/* S.No */}
                    <View style={[styles.tableCol, styles.cellColspan2]}>
                        <Text>{index + 1}</Text>
                    </View>

                    {/* Name */}
                    <View style={[styles.tableCol, styles.cellColspan5]}>
                        <Text>{row.fullname ?? row.first_name ?? ""}</Text>
                    </View>

                    {/* Nested Columns */}
                    <View style={[styles.tableCol, styles.cellColspan19]}>
                        <View style={styles.tableCounter}>

                            {columns.map((col: string) => {
                                if (col === "fullname" || col === "first_name") return null;

                                return (
                                    <View key={col} style={styles.counterItem}>
                                        <Text style={styles.countNum}>
                                            {row[col] ?? ""}
                                        </Text>
                                    </View>
                                );
                            })}

                        </View>
                    </View>

                </View>
            ))}
        </Page>
    </Document>
);