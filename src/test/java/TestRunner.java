import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeDriverService;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.testng.Assert;
import utils.BaseExcel;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;

public class TestRunner {
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
        //excel.createNewSheets(clientNames.size());
        for (int i = 0; i < 5; i++) {
            excel.writeExcel(filepath, i + 2, 1, 0,
                    clientNames.get(i).getText());
        }
        driver.quit();
    }
}






/*excel.writeExcel(filepath, 2, 1, 0,
                driver.findElement(
                        By.xpath("//a[contains(@href,'clientresource')]/following-sibling::span[@class='bold'][last()]/following-sibling::text()")).getText());*/