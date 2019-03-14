import javax.swing.JFrame;
import javax.swing.WindowConstants;
import java.awt.*;

public class MainFrame extends JFrame{

    public void init(){
        setDefaultCloseOperation(WindowConstants.DISPOSE_ON_CLOSE);
        setSize(new Dimension(600, 400));

        setVisible(true);
        setState(Frame.NORMAL);
    }

}
