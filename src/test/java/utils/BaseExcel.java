package utils;

import com.google.common.io.Files;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.ss.util.CellRangeAddress;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;

import java.io.*;
import java.text.SimpleDateFormat;
import java.util.*;

import static utils.BaseClass.*;
import static utils.BaseClass.getValue;

public class BaseExcel {

    public static String referenceFile = "input" + "/" + "NeoSOFT-Pipeline-Testing.xlsx";
    public static File clonedWb;
    public static String newPath;

    public static String[][] readExcel(String filepath, int no) {

        String[][] excel = new String[3001][5];
        try {

            FileInputStream excelFile = new FileInputStream(filepath);
            Workbook workbook = new XSSFWorkbook(excelFile);
            Sheet datatypeSheet = workbook.getSheetAt(no);
            Iterator<Row> iterator = datatypeSheet.iterator();

            int i = 0;
            int j;

            while (iterator.hasNext()) {

                Row currentRow = iterator.next();
                Iterator<Cell> cellIterator = currentRow.iterator();

                j = 0;
                while (cellIterator.hasNext()) {

                    Cell currentCell = cellIterator.next();

                    if (currentCell.getCellType() == CellType.STRING) {
                        excel[i][j] = currentCell.getStringCellValue();
                    } else if (currentCell.getCellType() == CellType.NUMERIC) {
                        excel[i][j] = String.valueOf((int) currentCell.getNumericCellValue());
                    }

                    j++;
                }
                i++;
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        return excel;
    }

    public String createNewWorkbook() throws IOException {
        File originalWb = new File(referenceFile);
        clonedWb = new File("output" + "/" + DateTime());
        clonedWb.mkdirs();
        newPath = clonedWb.getPath() + "/" + "NeoSOFT-Pipeline-Testing.xlsx";
        File newFile = new File(newPath);
        Files.copy(originalWb.getAbsoluteFile(), newFile);
        return newPath;
    }

    public static String DateTime() {
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("dd-MM-yyyy_hh-mm-ss");
        return simpleDateFormat.format(Calendar.getInstance().getTimeInMillis());
    }

    public void createCloneSheets(String filepath, int size, List<WebElement> requirementId, WebDriver driver) {
        FileInputStream excelFile;
        Workbook workbook;
        try {
            excelFile = new FileInputStream(filepath);
            workbook = new XSSFWorkbook(excelFile);
            int i = 0;
            ArrayList<String> uniqueValues = new ArrayList<>();

            List<String> sheetName = new ArrayList<>();
            for (WebElement element : requirementId) {
                sheetName.add(getValue(element).trim());
            }
            List<String> getSheetNames = new ArrayList<>();
            for (Sheet sheet : workbook) {
                getSheetNames.add(sheet.getSheetName().trim());
            }
            for (String item : sheetName) {
                if (!getSheetNames.contains(item)) {
                    uniqueValues.add(item);
                }
            }
            System.out.println(uniqueValues);


            for (String element : uniqueValues) {
                workbook.cloneSheet(1);
                workbook.setSheetName(workbook.getNumberOfSheets() - 1, element);
                //addDetails(filepath, size, driver);

                writeExcel(filepath, workbook.getNumberOfSheets() - 1, 1, 0,
                        clientNames.get(i).getText(), workbook, excelFile);
                writeExcel(filepath, workbook.getNumberOfSheets() - 1, 1, 2,
                        locations.get(i).getText(), workbook, excelFile);
                writeExcel(filepath, workbook.getNumberOfSheets() - 1, 1, 5,
                        assignChannel.get(i).getText(), workbook, excelFile);
                writeExcel(filepath, workbook.getNumberOfSheets() - 1, 1, 3,
                        requirementType.get(i).getText(), workbook, excelFile);
                writeExcel(filepath, workbook.getNumberOfSheets() - 1, 3, 5,
                        modeOfHiring.get(i).getText(), workbook, excelFile);
                writeExcel(filepath, workbook.getNumberOfSheets() - 1, 1, 1,
                        getValue(requirementId.get(i)).trim(), workbook, excelFile);
                writeExcel(filepath, workbook.getNumberOfSheets() - 1, 5, 0,
                        getValue(clientBudget.get(i)).trim(), workbook, excelFile);
                writeExcel(filepath, workbook.getNumberOfSheets() - 1, 5, 2,
                        getValue(workingDays.get(i)).trim(), workbook, excelFile);
                writeExcel(filepath, workbook.getNumberOfSheets() - 1, 3, 4,
                        getValue(duration.get(i)).trim(), workbook, excelFile);
                i++;
            }

            excelFile.close();

            FileOutputStream outputStream = new FileOutputStream(filepath);
            workbook.write(outputStream);
            workbook.close();
            outputStream.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
/*
    public void addDetails(String filepath, int size, WebDriver driver) {

        for (int i = 0; i < size; i++) {

            writeExcel(filepath, i + 3, 1, 0,
                    clientNames.get(i).getText());
            writeExcel(filepath, i + 3, 1, 2,
                    locations.get(i).getText());
            writeExcel(filepath, i + 3, 1, 5,
                    assignChannel.get(i).getText());
            writeExcel(filepath, i + 3, 1, 3,
                    requirementType.get(i).getText());
            writeExcel(filepath, i + 3, 3, 5,
                    modeOfHiring.get(i).getText());
            writeExcel(filepath, i + 3, 1, 1,
                    getValue(requirementId.get(i)).trim());
            writeExcel(filepath, i + 3, 5, 0,
                    getValue(clientBudget.get(i)).trim());
            writeExcel(filepath, i + 3, 5, 2,
                    getValue(workingDays.get(i)).trim());
            writeExcel(filepath, i + 3, 3, 4,
                    getValue(duration.get(i)).trim());
        }
    }*/

    public void writeExcel(String filepath, int no, int colNo, int rowNo, String value, Workbook workbook, FileInputStream excelFile) {

   /*     FileInputStream excelFile;
        Workbook workbook;*/
        try {
          /*  excelFile = new FileInputStream(filepath);
            workbook = new XSSFWorkbook(excelFile);*/

            Sheet sheet = workbook.getSheetAt(no);
            Cell cell = sheet.getRow(rowNo).getCell(colNo);
            cell.setCellValue(value);

            //excelFile.close();

            FileOutputStream outputStream = new FileOutputStream(filepath);
            workbook.write(outputStream);
            /*workbook.close();
            outputStream.close();*/
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public Workbook mergeExcelFiles(Workbook book, List<InputStream> inList) throws IOException {

        for (InputStream fin : inList) {
            Workbook b = WorkbookFactory.create(fin);
            for (int i = 0; i < b.getNumberOfSheets(); i++) {
                // not entering sheet name, because of duplicated names
                copySheets(book.createSheet(), b.getSheetAt(i));
            }
        }
        return book;
    }

    /**
     * @param newSheet the sheet to create from the copy.
     * @param sheet    the sheet to copy.
     */
    public static void copySheets(Sheet newSheet, Sheet sheet) {
        copySheets(newSheet, sheet, true);
    }

    /**
     * @param newSheet  the sheet to create from the copy.
     * @param sheet     the sheet to copy.
     * @param copyStyle true copy the style.
     */
    public static void copySheets(Sheet newSheet, Sheet sheet, boolean copyStyle) {
        int maxColumnNum = 0;
        Map<Integer, CellStyle> styleMap = (copyStyle) ? new HashMap<Integer, CellStyle>() : null;
        for (int i = sheet.getFirstRowNum(); i <= sheet.getLastRowNum(); i++) {
            Row srcRow = sheet.getRow(i);
            Row destRow = newSheet.createRow(i);
            if (srcRow != null) {
                copyRow(sheet, newSheet, srcRow, destRow, styleMap);
                if (srcRow.getLastCellNum() > maxColumnNum) {
                    maxColumnNum = srcRow.getLastCellNum();
                }
            }
        }
        for (int i = 0; i <= maxColumnNum; i++) {
            newSheet.setColumnWidth(i, sheet.getColumnWidth(i));
        }
    }

    /**
     * @param srcSheet  the sheet to copy.
     * @param destSheet the sheet to create.
     * @param srcRow    the row to copy.
     * @param destRow   the row to create.
     * @param styleMap  -
     */
    public static void copyRow(Sheet srcSheet, Sheet destSheet, Row srcRow, Row destRow, Map<Integer, CellStyle> styleMap) {
        // manage a list of merged zone in order to not insert two times a merged zone
        Set<CellRangeAddressWrapper> mergedRegions = new TreeSet<CellRangeAddressWrapper>();
        destRow.setHeight(srcRow.getHeight());
        // reckoning delta rows
        int deltaRows = destRow.getRowNum() - srcRow.getRowNum();
        // pour chaque row
        for (int j = srcRow.getFirstCellNum(); j <= srcRow.getLastCellNum(); j++) {
            Cell oldCell = srcRow.getCell(j);   // ancienne cell
            Cell newCell = destRow.getCell(j);  // new cell
            if (oldCell != null) {
                if (newCell == null) {
                    newCell = destRow.createCell(j);
                }
                // copy chaque cell
                copyCell(oldCell, newCell, styleMap);
                // copy les informations de fusion entre les cellules
                //System.out.println("row num: " + srcRow.getRowNum() + " , col: " + (short)oldCell.getColumnIndex());
                CellRangeAddress mergedRegion = getMergedRegion(srcSheet, srcRow.getRowNum(), (short) oldCell.getColumnIndex());

                if (mergedRegion != null) {
                    //System.out.println("Selected merged region: " + mergedRegion.toString());
                    CellRangeAddress newMergedRegion = new CellRangeAddress(mergedRegion.getFirstRow() + deltaRows, mergedRegion.getLastRow() + deltaRows, mergedRegion.getFirstColumn(), mergedRegion.getLastColumn());
                    //System.out.println("New merged region: " + newMergedRegion.toString());
                    CellRangeAddressWrapper wrapper = new CellRangeAddressWrapper(newMergedRegion);
                    if (isNewMergedRegion(wrapper, mergedRegions)) {
                        mergedRegions.add(wrapper);
                        destSheet.addMergedRegion(wrapper.range);
                    }
                }
            }
        }
    }

    /**
     * @param oldCell
     * @param newCell
     * @param styleMap
     */
    public static void copyCell(Cell oldCell, Cell newCell, Map<Integer, CellStyle> styleMap) {
        if (styleMap != null) {
            if (oldCell.getSheet().getWorkbook() == newCell.getSheet().getWorkbook()) {
                newCell.setCellStyle(oldCell.getCellStyle());
            } else {
                int stHashCode = oldCell.getCellStyle().hashCode();
                CellStyle newCellStyle = styleMap.get(stHashCode);
                if (newCellStyle == null) {
                    newCellStyle = newCell.getSheet().getWorkbook().createCellStyle();
                    newCellStyle.cloneStyleFrom(oldCell.getCellStyle());
                    styleMap.put(stHashCode, newCellStyle);
                }
                newCell.setCellStyle(newCellStyle);
            }
        }
        switch (oldCell.getCellType()) {
            case STRING:
                newCell.setCellValue(oldCell.getStringCellValue());
                break;
            case NUMERIC:
                newCell.setCellValue(oldCell.getNumericCellValue());
                break;
            case BOOLEAN:
                newCell.setCellValue(oldCell.getBooleanCellValue());
                break;
            case ERROR:
                newCell.setCellErrorValue(oldCell.getErrorCellValue());
                break;
            case FORMULA:
                newCell.setCellFormula(oldCell.getCellFormula());
                break;
            default:
                break;
        }

    }

    /**
     * Récupère les informations de fusion des cellules dans la sheet source pour les appliquer
     * à la sheet destination...
     * Récupère toutes les zones merged dans la sheet source et regarde pour chacune d'elle si
     * elle se trouve dans la current row que nous traitons.
     * Si oui, retourne l'objet CellRangeAddress.
     *
     * @param sheet   the sheet containing the data.
     * @param rowNum  the num of the row to copy.
     * @param cellNum the num of the cell to copy.
     * @return the CellRangeAddress created.
     */
    public static CellRangeAddress getMergedRegion(Sheet sheet, int rowNum, short cellNum) {
        for (int i = 0; i < sheet.getNumMergedRegions(); i++) {
            CellRangeAddress merged = sheet.getMergedRegion(i);
            if (merged.isInRange(rowNum, cellNum)) {
                return merged;
            }
        }
        return null;
    }

    /**
     * Check that the merged region has been created in the destination sheet.
     *
     * @param newMergedRegion the merged region to copy or not in the destination sheet.
     * @param mergedRegions   the list containing all the merged region.
     * @return true if the merged region is already in the list or not.
     */
    private static boolean isNewMergedRegion(CellRangeAddressWrapper newMergedRegion, Set<CellRangeAddressWrapper> mergedRegions) {
        return !mergedRegions.contains(newMergedRegion);
    }

}

class CellRangeAddressWrapper implements Comparable<CellRangeAddressWrapper> {

    public CellRangeAddress range;

    /**
     * @param theRange the CellRangeAddress object to wrap.
     */
    public CellRangeAddressWrapper(CellRangeAddress theRange) {
        this.range = theRange;
    }

    /**
     * @param o the object to compare.
     * @return -1 the current instance is prior to the object in parameter, 0: equal, 1: after...
     */
    public int compareTo(CellRangeAddressWrapper o) {

        if (range.getFirstColumn() < o.range.getFirstColumn()
                && range.getFirstRow() < o.range.getFirstRow()) {
            return -1;
        } else if (range.getFirstColumn() == o.range.getFirstColumn()
                && range.getFirstRow() == o.range.getFirstRow()) {
            return 0;
        } else {
            return 1;
        }
    }

}
