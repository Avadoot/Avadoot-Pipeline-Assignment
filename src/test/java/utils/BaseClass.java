package utils;

import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeDriverService;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.testng.Assert;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;

public class BaseClass {
    public static WebDriver driver;
    public static ChromeOptions chromeOptions = new ChromeOptions();
    public static String downloadFolderPath = System.getProperty("user.dir") + "\\testDataOutput\\";
    public static int waitTime = 45;
    public static WebDriverWait webDriverWait;
    public static String URL = "file:/Users/marcov/Documents/Avadoot/Pipeline-Assignment/script/ManagementInformationSystem.html";
    public static BaseExcel excel = new BaseExcel();
    public static String filepath = "NeoSOFT-Pipeline-Testing.xlsx";

    public static void main(String[] args) throws IOException {

        WebDriverManager.chromedriver().setup();

        System.setProperty(ChromeDriverService.CHROME_DRIVER_SILENT_OUTPUT_PROPERTY, "true");

        HashMap<String, Object> chromeLocalStatePref = new HashMap<>();
        chromeLocalStatePref.put("download.default_directory", downloadFolderPath);
        chromeLocalStatePref.put("download.prompt_for_download", true);

        chromeOptions.setExperimentalOption("localState", chromeLocalStatePref);
        chromeOptions.setExperimentalOption("prefs", chromeLocalStatePref);

        chromeOptions.addArguments("headless");
        chromeOptions.addArguments("window-size=1280x1024");
        chromeOptions.addArguments("--no-sandbox");

        driver = new ChromeDriver(chromeOptions);
        webDriverWait = new WebDriverWait(driver, waitTime);

        driver.get(URL);
        driver.manage().window().maximize();
        String expectedPageTitle = "Management Information System";
        Assert.assertTrue(driver.getTitle().contains(expectedPageTitle), "Test Failed");


        List<WebElement> clientNames = driver.findElements(
                By.xpath("//a[contains(@href,'clientresource')]/following-sibling::span[@class='warning'][last()]"));

        List<WebElement> locations = driver.findElements(
                By.xpath("//a[contains(@href,'clientresource')]//parent::td//parent::tr//td[5]"));

        List<WebElement> assignChannel = driver.findElements(
                By.xpath("//span[text()='Assign Channel: ']//following-sibling::a"));

        List<WebElement> requirementType = driver.findElements(
                By.xpath("//*[contains(@onclick,'updateClientType')]"));

        List<WebElement> modeOfHiring = driver.findElements(
                By.xpath("//*[contains(@onclick,'assignChannel')]"));

        List<WebElement> requirementId = driver.findElements(
                By.xpath("//span[text()='Requirement ID:']"));

        List<WebElement> clientBudget = driver.findElements(
                By.xpath("//*[text()='Budget: ']"));

        List<WebElement> workingDays = driver.findElements(
                By.xpath("//*[text()='Working Days: ']"));

        List<WebElement> duration = driver.findElements(
                By.xpath("//*[text()='Duration Remark: ']"));

        excel.createCloneSheets(filepath, clientNames.size(), requirementId);

        for (int i = 0; i < clientNames.size(); i++) {

            excel.writeExcel(filepath, i + 3, 1, 0,
                    clientNames.get(i).getText());
            excel.writeExcel(filepath, i + 3, 1, 2,
                    locations.get(i).getText());
            excel.writeExcel(filepath, i + 3, 1, 5,
                    assignChannel.get(i).getText());
            excel.writeExcel(filepath, i + 3, 1, 3,
                    requirementType.get(i).getText());
            excel.writeExcel(filepath, i + 3, 3, 5,
                    modeOfHiring.get(i).getText());
            excel.writeExcel(filepath, i + 3, 1, 1,
                    getValue(requirementId.get(i)).trim());
            excel.writeExcel(filepath, i + 3, 5, 0,
                    getValue(clientBudget.get(i)).trim());
            excel.writeExcel(filepath, i + 3, 5, 2,
                    getValue(workingDays.get(i)).trim());
            excel.writeExcel(filepath, i + 3, 3, 4,
                    getValue(duration.get(i)).trim());
        }
        driver.quit();
    }

    public static String getValue(WebElement element) {

        JavascriptExecutor jse = (JavascriptExecutor) driver;
        return (String) jse.executeScript("return arguments[0].nextSibling.textContent;", element);
    }
}