/** *****************************************************************************
 * DISCLAIMER: The sample code or utility or tool described herein
 *    is provided on an "as is" basis, without warranty of any kind.
 *    GSTN does not warrant or guarantee the individual success
 *    developers may have in implementing the sample code on their
 *    environment.
 *
 *    GSTN  does not warrant, guarantee or make any representations
 *    of any kind with respect to the sample code and does not make
 *    any representations or warranties regarding the use, results
 *    of use, accuracy, timeliness or completeness of any data or
 *    information relating to the sample code. UIDAI disclaims all
 *    warranties, express or implied, and in particular, disclaims
 *    all warranties of merchantability, fitness for a particular
 *    purpose, and warranties related to the code, or any service
 *    or software related thereto.
 *
 *   GSTN  is not responsible for and shall not be liable directly
 *    or indirectly for any direct, indirect damages or costs of any
 *    type arising out of use or any action taken by you or others
 *    related to the sample code.
 *
 *    THIS IS NOT A SUPPORTED SOFTWARE.
 ***************************************************************************** */
package in.gov.gst.crypto;

import java.io.FileInputStream;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.security.PublicKey;
import java.security.Security;
import java.security.cert.CertificateFactory;
import java.security.cert.X509Certificate;
import org.bouncycastle.jce.provider.BouncyCastleProvider;
import javax.crypto.BadPaddingException;
import javax.crypto.Cipher;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;


/**
 * This class is used to encrypt the string using a public key
 *
 * @date 16th September, 2016
 */
public class EncryptionUtil {

    
    //public key url or location on the desktop for testing
   // public static String publicKeyUrl1 = "C:\\Users\\mayur\\Downloads\\GST_Sandbox_Public_key\\GSTN_G2A_SANDBOX_UAT_public.cer";
    
	
	public static String publicKeyUrl1 = "C:\\xampp\\htdocs\\Mean\\gstone-project\\testingCode\\java\\SampleCode\\GST_Sandbox_Public_key\\GSTN_G2A_SANDBOX_UAT_public.cer";
	private static String file;

    private static PublicKey readPublicKey(String filename) throws Exception {
        FileInputStream fin = new FileInputStream(filename);
        CertificateFactory f = CertificateFactory.getInstance("X.509");
        X509Certificate certificate = (X509Certificate) f.generateCertificate(fin);
        PublicKey pk = certificate.getPublicKey();
        Security.addProvider(new BouncyCastleProvider());
        return pk;

    }

    /**
     * This method is used to encrypt the string , passed to it using a public
     * key provided
     *
     * @param planTextToEncrypt : Text to encrypt
     * @return :encrypted string
     */
    public static String encrypt(byte[] plaintext) throws Exception, NoSuchAlgorithmException, NoSuchPaddingException, InvalidKeyException, IllegalBlockSizeException, BadPaddingException {

        PublicKey key = readPublicKey(publicKeyUrl1);
        Cipher cipher = Cipher.getInstance("RSA/ECB/PKCS1Padding");
  //      Cipher cipher = Cipher.getInstance("RSA/ECB/PKCS5Padding");
        cipher.init(Cipher.ENCRYPT_MODE, key);
        byte[] encryptedByte = cipher.doFinal(plaintext);
        String encodedString = new String(java.util.Base64.getEncoder().encode(encryptedByte));
        return encodedString;
    }

    public static String generateEncAppkey(byte[] key) {
        try {
            return encrypt(key);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

}
