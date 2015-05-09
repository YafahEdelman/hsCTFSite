import javax.swing.JButton;
import javax.swing.JTextField;
import javax.swing.JFrame;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import javax.swing.JOptionPane;
public class Reversing1 implements ActionListener {

    private String dogeDog = "";
    private JButton buttonDoge;
    private JTextField fieldDoge;
    private JFrame frameDoge;
    
    public Reversing1() {
        frameDoge = new JFrame("Reversing 1");
        frameDoge.setLayout(new FlowLayout());
        frameDoge.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);

        buttonDoge = new JButton("Submit");
        frameDoge.getContentPane().add(buttonDoge);

        fieldDoge = new JTextField(20);
        frameDoge.getContentPane().add(fieldDoge);

        buttonDoge.addActionListener(this);



        frameDoge.setSize(400, 90);
        frameDoge.setVisible(true);

    }

    public void actionPerformed(ActionEvent e) {
      
        if(e.getSource() == buttonDoge) {
            dogeDog = fieldDoge.getText();
            if(dogeDog.length() != 13) {
                JOptionPane.showMessageDialog(frameDoge, "Woops");
            } else {
                if(dogeDogeDogeDogeDoge(dogeDog).equals("uihrhruidenfd")) {
                    JOptionPane.showMessageDialog(frameDoge, "woohoo, you got it!");
                } else {
                    JOptionPane.showMessageDialog(frameDoge, "Woops");
                }
            }
        }
    }

    public String dogeDogeDogeDogeDoge(String doge) {
        char[] suchChar = doge.toCharArray();
        char[] manyToReturn = new char[suchChar.length];
        for(int muchIndex = 0; muchIndex < suchChar.length; muchIndex++) {
            int soTemp = (int)suchChar[muchIndex];
            manyToReturn[muchIndex] = (char)(((soTemp & 11 | ~(0 >> 3)) & (soTemp ^ 1))) ;
        }

        return new String(manyToReturn);
    }

    public static void main(String[] args) {
        Reversing1 test=new Reversing1();
    }
}