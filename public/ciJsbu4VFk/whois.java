public class Problem {

	public static String a()
	{
		double b=0;
		for (double i=1;i<Double.POSITIVE_INFINITY;i++)
		{
			b+=1/i/i;
		}
		b=Math.sqrt(b*6);
		return ""+b;
	}
	public static int b()
	{
		return a().indexOf("999999");
	}
}