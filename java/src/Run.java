/*
	OVERVIEW:
	A bootstrap tool for running main.js. Assumes main.js is in
	the same directory as the run.jar file.
	
	Its duty is simply to add the absolute path for main.js as
	the first argument to the main.js script itself. This enables
	the script to know it's own directory, useful for accessing
	resources via relative filepaths.

	AUTHOR: Michael Mathews <micmath@gmail.com>
	LICENSE: Apache License 2.0 - See file 'LICENSE.markdown' in this project.
	USAGE: java -jar run.jar <args>
 */

import java.io.File;
import java.net.URL;
import java.util.*;

public class Run {
	
	// requires java.io.File, java.net.URL
	public static void main(String[] args) throws java.io.IOException {
		// get the absolute file path to the jar file containing this class
		ClassLoader loader = Run.class.getClassLoader();
		
		// url is like "file:/Users/michael/WorkArea/jsdoc/run.jar!/Run.class"
		String jarUrl = loader.getResource("Run.class").getPath();
		
		// parse the filepath out of the URL
		String delims = "[:!]";
		String[] tokens = jarUrl.split(delims);
		String jarPath = tokens[1];
		
		// the base directory, assumed to contain main.js
		String jarDir = new File(jarPath).getParent();
		String mainPath = jarDir + "/main.js";
        
        // Rhino eats the first arg (the path to the script file it is running)
        // so we add it twice: one for Rhino the next for us
		String[] mainArgs = {mainPath, mainPath};
		String[] allArgs = concat(mainArgs, args);
		
		// main.js will now get arguments like:
		// ["/abs/path/to/main.js", "-a", "aval", "-b", "bval"]
		org.mozilla.javascript.tools.shell.Main.main(allArgs);
    }
    
    // requires java.util
    public static String[] concat(String[] a, String[] b) {
		List<String> ab = new ArrayList<String>(a.length + b.length);
		Collections.addAll(ab, a);
		Collections.addAll(ab, b);
		return ab.toArray(new String[] {});
	}
}
