<?php
/**
 * @version    CVS: 1.0.0
 * @package    Com_Adminreminder
 * @author     Rahul <softweaver.tech@gmail.com>
 * @copyright  Copyright (C) 2015. All rights reserved.
 * @license    GNU General Public License version 2 or later; see LICENSE.txt
 */

defined('_JEXEC') or die;  

$date =& JFactory::getDate();
$task = $_REQUEST['task'];
$name = $_REQUEST['name'];
$username = $_REQUEST['username'];
$password = $_REQUEST['password1'];
$email = $_REQUEST['email1'];
$userPid = $_REQUEST['usruid'];
$usrcid = $_REQUEST['usrcid'];
$loginid = $_REQUEST['loginid'];
$curfullname = $_REQUEST['curfullname'];
$curiname = $_REQUEST['curiname'];
$motto = $_REQUEST['motto'];
$url = $_REQUEST['imageURI'];
$type = $_REQUEST['type'];
$circleid = $_REQUEST['circleid'];
$circleuserid = $_REQUEST['userid'];
$notiid = $_REQUEST['notiid'];
$msgid = $_REQUEST['msgid'];
$priority = $_REQUEST['proirty'];
$fromuserid = $_REQUEST['fromuserid'];
$message = $_REQUEST['message'];
$touserid = $_REQUEST['touserid'];
$subject = $_REQUEST['subject'];
$msgstatusnum = $_REQUEST['msgstatusnum'];
$search = $_REQUEST['search'];
$attch = $_REQUEST['attch'];
$cid = $_REQUEST['cid'];
$element = $_REQUEST['element'];
$commentdes = $_REQUEST['commentdes'];
$commentid = $_REQUEST['commentid'];
$commentoption = $_REQUEST['commentoption'];
$commentuserid = $_REQUEST['commentuserid'];
$followuser = $_REQUEST['followuser'];
$useraddtocircle = $_REQUEST['useraddtocircle'];
$statusupdate = $_REQUEST['statusupdate'];
$postid = $_REQUEST['postid'];
$checkedvalue = $_REQUEST['checkedvalue'];
$sharetext =$_REQUEST['sharetext'];

if($_REQUEST['parentcid']) {
	$parentcid = $_REQUEST['parentcid'];
} else {
	$parentcid = "0";
}

if($_REQUEST['parentelement']) {
	$parentelement = $_REQUEST['parentelement'];
} else {
	$parentelement = "";
}

if($_REQUEST['userid']) {
	$userFbId = $_REQUEST['userid'];
} else {
	$userFbId = 0;
}

switch ($task) {
    case 'appRegistration':
        appRegistration($name, $username, $email, $password, $date, $userFbId); 
        break;
    case 'appLogin':
        appLogin($username, $password); 
        break;
    case 'applogout':
        appLogout($loginid); 
        break;
    case 'appConnectionFb':
        appConnectionFb($name, $username, $email, $password, $date, $userFbId); 
        break;
    case 'timelineContent':
        timelineContent(); 
        break;
    case 'profileContent':
        profileContent($loginid); 
        break;
    case 'profileCover':
       	profileCover($loginid); 
        break;
    case 'profileeditContent':
       	profileeditContent($loginid); 
        break; 
    case 'profileEditsave':
       	profileEditsave($loginid, $curfullname, $curiname, $motto); 
        break;  
    case 'imageupload':
       	imageupload($loginid, $date); 
        break;
    case 'avatarupload':
        avatarupload($loginid, $date);
        break;
    case 'headerupload':
        headerupload($loginid, $date);
        break;
    case 'videoupload':
        videoupload($loginid, $date);
        break;
    case 'fetchvideo':
        fetchvideo($loginid, $date, $url);
        break;
    case 'searchFront':
        searchFront($loginid, $date, $type);
        break;
    case 'membersContent':
        membersContent($loginid);
        break;
    case 'matchupsContent':
        matchupsContent($loginid);
        break;
    case 'circlesContent':
        circlesContent($loginid);
        break;
    case 'removecircle':
        removecircle($circleid, $loginid);
        break;
    case 'addcircle':
        addcircle($circleid, $loginid);
        break;
    case 'viewcirclemembers':
        viewcirclemembers($circleid, $loginid);
        break;
    case 'removeCcircle':
        removeCcircle($circleid, $loginid, $circleuserid);
        break;    
    case 'viewcircle':
        viewcircle($circleid, $loginid);
        break;
    case 'mymatchups':
        mymatchups($loginid);
        break;
    case 'notifications':
        notifications($loginid);
        break;
    case 'readnotifications':
        readnotifications($loginid, $notiid);
        break;
    case 'countnotifications':
        countnotifications($loginid);
        break;
    case 'mailbox':
        mailbox($loginid);
        break;
    case 'setpriority':
        setpriority($loginid, $msgid, $priority);
        break;
    case 'viewmessage':
        viewmessage($loginid, $msgid, $fromuserid);
        break;
    case 'sendmessage':
        sendmessage($loginid, $message, $touserid, $subject, $attch, $date);
        break;
    case 'previewmsg':
        previewmsg($loginid, $msgid, $msgstatusnum);
        break;
    case 'sendmainmessage':
		sendmainmessage($loginid, $message, $touserid, $subject, $attch, $date);
        break;
    case 'searchusertosendmail':
        searchusertosendmail($loginid, $search);
        break;
    case 'mzgimageupload':
       	mzgimageupload($loginid, $date); 
        break;
    case 'likedislike':
       	likedislike($loginid, $cid, $date, $element); 
        break;
    case 'docomments':
       	docomments($loginid, $cid, $date, $element, $commentdes, $parentcid, $parentelement); 
        break;
    case 'commentbox':
       	commentbox($loginid, $cid); 
        break;
    case 'delectehidecomment':
       	delectehidecomment($loginid, $commentid, $commentoption, $cid); 
        break;
    case 'commentlike':
       	commentlike($loginid, $commentid, $commentuserid, $date, $element); 
        break;
    case 'supportunsupport':
    	supportunsupport($loginid, $cid, $date, $element); 
        break;        
    case 'followuser':
    	followuser($loginid, $followuser, $date); 
        break;  
    case 'makefriend':
    	makefriend($loginid, $followuser, $date); 
        break;
    case 'loggedusercircles':
        loggedusercircles($loginid, $useraddtocircle);
        break;
    case 'addusertocircle':
        addusertocircle($loginid, $useraddtocircle, $circleid);
        break;
    case 'touserdetails':
        touserdetails($loginid, $touserid);
        break;
    case 'executeprivatemessage':
	    executeprivatemessage($loginid, $message, $touserid, $subject, $attch2, $date);
	    break;
    case 'updateStatus':
        updateStatus($loginid, $statusupdate,$date);
        break;
    case 'shareit':
        shareit($loginid, $postid);
        break;
    case 'shareitnow':
        shareitnow($loginid, $postid, $checkedvalue, $sharetext, $date);
        break;

    default:  	
        break;
}

function appRegistration($name, $username, $email, $password, $date, $userFbId) {

	$passwordtemp = $password;
	$salt = JUserHelper::genRandomPassword(32);
	$crypt = JUserHelper::getCryptedPassword($password, $salt);
	$password = $crypt . ':' . $salt;

	$db =& JFactory::getDBO();
	$query = $db->getQuery(true);
	$columns = array('name', 'username', 'email', 'password', 'registerDate');
	$values = array($name, $username, $email, $password, $date);
	
	$dbemail = "SELECT email FROM #__users where email='".$email."'";
	$db->setQuery($dbemail);
	$db->query();
	$result = $db->getNumRows();

	$dbusername = "SELECT username FROM #__users where email='".$username."'";
	$db->setQuery($dbusername);
	$db->query();
	$result1 = $db->getNumRows();
	
	if($result <= 0 && $result1 <= 0 ){
		$query = "INSERT INTO #__users (name, username, email, password, registerDate) VALUES ('".$name."','".$username."', '".$email."', '".$password."', '".$date."')";
		$db->setQuery($query);
		$db->query();
		$insertid = $db->insertid();
		if($insertid != "") 
		{
			$query0 = "INSERT INTO #__iconnect_profiles (profiletype, fullname, iname, userid, online, logindate, status, wallacl) VALUES ('7','".$name."','".$username."', '".$insertid."', '0', '".$date."', '1', 'f0')";
			$db->setQuery($query0);
			$db->query();

			$query1 = "INSERT INTO #__user_usergroup_map (user_id , group_id) VALUES ('".$insertid."', '2')";
			$db->setQuery($query1);
			$db->query();

			if ($userFbId != 0) {
		    	appLogin($username, $passwordtemp);	
		    } else {
		    	$mzg = "Registration Success";
		    	echo $mzg;
		    }
		} else {
			$mzg = "Registration Error";
			echo $mzg;
		}
	} else {
		$mzg = "Already Exists";
		echo $mzg;
	}
	exit;
}

function appLogin($username, $password) {	
	
	$db =& JFactory::getDBO();
	$query = $db->getQuery(true);
	$dbemail = "SELECT id FROM #__users where username='".$username."'";
	
	$db->setQuery($dbemail);
	$login = $db->loadObjectList();
	$loginid = $login[0]->id;
	
	

	$app    = JFactory::getApplication();
	$options = array();
	$credentials = array();
	$credentials['username']  = $username;
	$credentials['password']  = $password;
	if (true === $app->login($credentials, $options)) {
		$query0 = "UPDATE #__iconnect_profiles SET online= '1', logindate= '".$date."' WHERE userid='".$loginid."'";
		$db->setQuery($query0);
		$db->query();

		$mzg = "Login Success".$loginid;
		echo $mzg;
	} else {
		$mzg = "Login Error";
		echo $mzg;
	}
	exit;
}

function appLogout($loginid) {
	$db =& JFactory::getDBO();
	$query = $db->getQuery(true);

	$query0 = "UPDATE #__iconnect_profiles SET online= '0' WHERE userid='".$loginid."'";
	$db->setQuery($query0);
	$db->query();

	exit;
}

function appConnectionFb($name, $username, $email, $password, $date, $userFbId) {
	if($password == "") {
		$password = strtolower(str_replace(' ', '', $name))."@12345";			
	}
	
	$db =& JFactory::getDBO();
	$query = $db->getQuery(true);

	$dbemail = "SELECT email FROM #__users where email='".$email."'";
	$db->setQuery($dbemail);
	$db->query();
	$result = $db->getNumRows();

	if($result == 0 ){
		appRegistration($name, $username, $email, $password, $date, $userFbId);
		return true;
	} else {
		appLogin($username, $password);
		return true;
	}
}

function timelineContent() {
	$db =& JFactory::getDBO();
	$query = $db->getQuery(true);
	$published = '1';
	$likestatus = '1';
	$supportstatus = '1';
		
	$dbemail = 'SELECT p.*, u.fullname, u.iname, u.avatar, u.header, u.thumb as avatarm FROM `#__iconnect_activities` as p LEFT JOIN `#__iconnect_profiles` as u ON ('.$db->quoteName('u.userid').' = '.$db->quoteName('p.user_id').') WHERE '.$db->quoteName('p.circleid').' = '.$db->quote($circleid).' AND '.$db->quoteName('p.published').' = '. $db->quote($published).'ORDER BY'.$db->quoteName('p.id').' DESC';

	$db->setQuery($dbemail);
	$results = $db->loadObjectList();

	$response = array();

	foreach ($results as $key => $result) {

		$likes = 'SELECT * FROM `#__iconnect_likes` WHERE `cid` ="'.$result->cid.'" AND `like` = "'.$likestatus.'" ORDER BY id DESC';
		$db->setQuery($likes);
		$postLike = $db->loadObjectList();
		$db->query();
		$like = $db->getNumRows();

		$comments = 'SELECT * FROM `#__iconnect_comments` WHERE `cid` ="'.$result->cid.'" AND `published` = "'.$published.'" ORDER BY id DESC';
		$db->setQuery($comments);
		$postComment = $db->loadObjectList();
		$db->query();
		$comment = $db->getNumRows();

		$supports = 'SELECT * FROM `#__iconnect_support` WHERE `cid` ="'.$result->cid.'" AND `support` = "'.$supportstatus.'" ORDER BY id DESC';
		$db->setQuery($supports);
		$postSupport = $db->loadObjectList();
		$db->query();
		$support = $db->getNumRows();


		// echo "<pre>";
		// echo "<br /> cid = ". $result->cid . " comment = ". $comment . " <br /> ";
		// print_r($postComment);

		if($result->type == "photos" && $result->action =="posted")
		{
			$dbphoto = 'SELECT photo FROM `#__iconnect_photos` WHERE userid ="'.$result->user_id.'" AND id ="'.$result->cid.'" ORDER BY id DESC';

			$db->setQuery($dbphoto);
			$photos = $db->loadObjectList();
			
			$photoData= explode(",",str_replace('}', '', str_replace('{photo:', '', str_replace('thumb:', '', str_replace('"', '', $photos['0']->photo)))));

			$response[$result->id] = array('type' => $result->type, 'action' => $result->action, 'id' => $result->id, 'userid' => $result->user_id, 'cid' => $result->cid, 'photo' => $photoData['0'], 'thumb' => $photoData['1'], 'fullname' => $result->fullname, 'iname' => $result->iname, 'avatar' => $result->avatar, 'avatarm' => $result->avatarm,'header' => $result->header, 'text' => $result->text, 'like' => $like, 'comment' => $comment, 'support' => $support );
		}
		else if($result->type == "circle" && $result->action =="posted")
		{

			$dbcircle = 'SELECT title, cover, thumb FROM `#__iconnect_circles` WHERE userid ="'.$result->user_id.'" AND id ="'.$result->cid.'" ORDER BY id DESC';

			$db->setQuery($dbcircle);
			$circle = $db->loadObjectList();

			$circleData= $circle['0'];

			$response[$result->id] = array('type' => $result->type, 'action' => $result->action, 'id' => $result->id, 'userid' => $result->user_id, 'cid' => $result->cid, 'title' => $circleData->title, 'cover' => $circleData->cover, 'thumb' => $circleData->thumb, 'fullname' => $result->fullname, 'iname' => $result->iname, 'avatar' => $result->avatar, 'avatarm' => $result->avatarm,'header' => $result->header, 'text' => $result->text, 'like' => $like, 'comment' => $comment, 'support' => $support  );
		}
		else if($result->type == "profile" && $result->action =="newcover")
		{
			$response[$result->id] = array('type' => $result->type, 'action' => $result->action, 'id' => $result->id, 'userid' => $result->user_id, 'cid' => $result->cid, 'fullname' => $result->fullname, 'iname' => $result->iname, 'avatar' => $result->avatar, 'avatarm' => $result->avatarm, 'header' => $result->header, 'text' => $result->text, 'like' => $like, 'comment' => $comment, 'support' => $support  );
		}
		else if($result->type == "profile" && $result->action =="newavatar")
		{
			$response[$result->id] = array('type' => $result->type, 'action' => $result->action, 'id' => $result->id, 'userid' => $result->user_id, 'cid' => $result->cid, 'fullname' => $result->fullname, 'iname' => $result->iname, 'avatar' => $result->avatar, 'avatarm' => $result->avatarm, 'header' => $result->header, 'text' => $result->text, 'like' => $like, 'comment' => $comment, 'support' => $support  );
		}
		else if(($result->type == "localvideo" || $result->type == "video" ) && $result->action =="posted")
		{
			$dbvideo = 'SELECT video FROM `#__iconnect_videos` WHERE userid ="'.$result->user_id.'" AND id ="'.$result->cid.'" ORDER BY id DESC';

			$db->setQuery($dbvideo);
			$video = $db->loadObjectList();

			$videoData = explode(",",str_replace('}', '', str_replace('description:', '',  str_replace('{vtype:', '', str_replace('mp4:', '', str_replace('image:', '', str_replace('title:', '', str_replace('thumb:', '', str_replace('"', '', $video['0']->video)))))))));

			$response[$result->id] = array('type' => $result->type, 'action' => $result->action, 'id' => $result->id, 'userid' => $result->user_id, 'cid' => $result->cid, 'vtype' => $photoData['0'], 'title' => $videoData['1'], 'description' => $videoData['2'],  'image' => $videoData['3'], 'mp4' => $videoData['4'], 'fullname' => $result->fullname, 'iname' => $result->iname, 'avatar' => $result->avatar, 'avatarm' => $result->avatarm, 'header' => $result->header, 'text' => $result->text, 'like' => $like, 'comment' => $comment, 'support' => $support  );
		}
		else if($result->type == "link" && $result->action =="posted")
		{
			$dblink = 'SELECT link FROM `#__iconnect_links` WHERE userid ="'.$result->user_id.'" AND id ="'.$result->cid.'" ORDER BY id DESC';

			$db->setQuery($dblink);
			$links = $db->loadObjectList();
			
			$linkData = explode("^^", str_replace('}', '', str_replace(',', '', str_replace('\/', '/', str_replace('description:', '^^', str_replace('image:', '^^', str_replace('title:', '^^', str_replace('{link:', '', str_replace('"', '', $links['0']->link)))))))));

			$linkarr = array('link' => $linkData['0'], 'title' => $linkData['1'], 'description' => $linkData['2'],  'image' => $linkData['3']);

			$response[$result->id] = array('type' => $result->type, 'action' => $result->action, 'id' => $result->id, 'userid' => $result->user_id, 'cid' => $result->cid, 'link' => $linkData['0'], 'title' => $linkData['1'], 'description' => $linkData['2'],  'image' => $linkData['3'], 'fullname' => $result->fullname, 'iname' => $result->iname, 'avatar' => $result->avatar, 'avatarm' => $result->avatarm, 'header' => $result->header, 'text' => $result->text, 'like' => $like, 'comment' => $comment, 'support' => $support  );
		}
		else if($result->type == "board" && $result->action =="posted")
		{
			$dbboard = 'SELECT title, description, cover, thumb FROM `#__iconnect_boards` WHERE userid ="'.$result->user_id.'" AND id ="'.$result->cid.'" ORDER BY id DESC';

			$db->setQuery($dbboard);
			$boards = $db->loadObjectList();

			$boardData= $boards['0'];

			$response[$result->id] = array('type' => $result->type, 'action' => $result->action, 'id' => $result->id, 'userid' => $result->user_id, 'cid' => $result->cid, 'title' => $boardData->title, 'description' => $boardData->description, 'cover' => $boardData->cover, 'thumb' => $boardData->thumb, 'fullname' => $result->fullname, 'iname' => $result->iname, 'avatar' => $result->avatar, 'avatarm' => $result->avatarm, 'header' => $result->header, 'text' => $result->text, 'like' => $like, 'comment' => $comment, 'support' => $support  );

		}
		// else if($result->action =="shared") 
		// {
		// 	echo "<br /><br /><br />type => ".$result->type."<br />action =>".$result->action."<br />id=> ".$result->id;
		// }
		else
		{

			$dbboard = 'SELECT title, description, cover, thumb FROM `#__iconnect_boards` WHERE userid ="'.$result->user_id.'" AND id ="'.$result->cid.'" ORDER BY id DESC';

			$db->setQuery($dbboard);
			$otherD = $db->loadObjectList();

			$boardData= $otherD['0'];

			$response[$result->id] = array('type' => $result->type, 'action' => $result->action, 'id' => $result->id, 'userid' => $result->user_id, 'cid' => $result->cid, 'fullname' => $result->fullname, 'iname' => $result->iname, 'avatar' => $result->avatar, 'avatarm' => $result->avatarm, 'header' => $result->header, 'text' => $result->text, 'like' => $like, 'comment' => $comment, 'support' => $support  );

			
		}
	}
	$lastidquery = 'SELECT id FROM `#__iconnect_activities` ORDER BY id DESC LIMIT 1';

	$db->setQuery($lastidquery);
	$lastid = $db->loadObjectList();

	$response['total'] = $lastid['0'];
	
	// echo "<pre>";
	// print_r($postLike);
	echo json_encode($response);
	exit;
}

function profileContent($loginid) {	

	$db =& JFactory::getDBO();
	$query = $db->getQuery(true);
	$published = '1';
	$likestatus = '1';
	$supportstatus = '1';
		
	$dbemail = 'SELECT p.*, u.fullname, u.iname, u.avatar, u.header, u.thumb as avatarm FROM `#__iconnect_activities` as p LEFT JOIN `#__iconnect_profiles` as u ON ('.$db->quoteName('u.userid').' = '.$db->quoteName('p.user_id').') WHERE '.$db->quoteName('p.user_id').' = '.$loginid.' AND '.$db->quoteName('p.published').' = '. $db->quote($published).'ORDER BY'.$db->quoteName('p.id').' DESC';
	$db->setQuery($dbemail);
	$results = $db->loadObjectList();
	$response = array();

	foreach ($results as $key => $result) {

		$likes = 'SELECT * FROM `#__iconnect_likes` WHERE `cid` ="'.$result->cid.'" AND `like` = "'.$likestatus.'" ORDER BY id DESC';
		$db->setQuery($likes);
		$postLike = $db->loadObjectList();
		$db->query();
		$like = $db->getNumRows();

		$comments = 'SELECT * FROM `#__iconnect_comments` WHERE `cid` ="'.$result->cid.'" AND `published` = "'.$published.'" ORDER BY id DESC';
		$db->setQuery($comments);
		$postComment = $db->loadObjectList();
		$db->query();
		$comment = $db->getNumRows();

		$supports = 'SELECT * FROM `#__iconnect_support` WHERE `cid` ="'.$result->cid.'" AND `support` = "'.$supportstatus.'" ORDER BY id DESC';
		$db->setQuery($supports);
		$postSupport = $db->loadObjectList();
		$db->query();
		$support = $db->getNumRows();

		// echo "<pre>";
		// print_r($like);
		// print_r($comment);

		if($result->type == "photos" && $result->action =="posted")
		{
			$dbphoto = 'SELECT photo FROM `#__iconnect_photos` WHERE id ="'.$result->cid.'"  ORDER BY id DESC';
			$db->setQuery($dbphoto);
			$photos = $db->loadObjectList();
			$photoData= explode(",",str_replace('}', '', str_replace('{photo:', '', str_replace('thumb:', '', str_replace('"', '', $photos['0']->photo)))));
			$response[$result->id] = array('type' => $result->type, 'action' => $result->action, 'id' => $result->id, 'userid' => $loginid, 'cid' => $result->cid, 'photo' => $photoData['0'], 'thumb' => $photoData['1'], 'fullname' => $result->fullname, 'iname' => $result->iname, 'avatar' => $result->avatar, 'avatarm' => $result->avatarm,'header' => $result->header, 'text' => $result->text, 'like' => $like, 'comment' => $comment, 'support' => $support );
		}
		else if($result->type == "circle" && $result->action =="posted")
		{
			$dbcircle = 'SELECT title, cover, thumb FROM `#__iconnect_circles` WHERE userid ="'.$loginid.'"  ORDER BY id DESC';
			$db->setQuery($dbcircle);
			$circle = $db->loadObjectList();
			$circleData= $circle['0'];
			$response[$result->id] = array('type' => $result->type, 'action' => $result->action, 'id' => $result->id, 'userid' => $loginid, 'cid' => $result->cid, 'title' => $circleData->title, 'cover' => $circleData->cover, 'thumb' => $circleData->thumb, 'fullname' => $result->fullname, 'iname' => $result->iname, 'avatar' => $result->avatar, 'avatarm' => $result->avatarm,'header' => $result->header, 'text' => $result->text, 'like' => $like, 'comment' => $comment, 'support' => $support );
		}
		else if($result->type == "profile" && $result->action =="newcover")
		{
			$response[$result->id] = array('type' => $result->type, 'action' => $result->action, 'id' => $result->id, 'userid' => $loginid, 'cid' => $result->cid, 'fullname' => $result->fullname, 'iname' => $result->iname, 'avatar' => $result->avatar, 'avatarm' => $result->avatarm, 'header' => $result->header, 'text' => $result->text, 'like' => $like, 'comment' => $comment, 'support' => $support );
		}
		else if($result->type == "profile" && $result->action =="newavatar")
		{
			$response[$result->id] = array('type' => $result->type, 'action' => $result->action, 'id' => $result->id, 'userid' => $loginid, 'cid' => $result->cid, 'fullname' => $result->fullname, 'iname' => $result->iname, 'avatar' => $result->avatar, 'avatarm' => $result->avatarm, 'header' => $result->header, 'text' => $result->text, 'like' => $like, 'comment' => $comment, 'support' => $support );
		}
		else if(($result->type == "localvideo" || $result->type == "video" ) && $result->action =="posted")
		{
			$dbvideo = 'SELECT video FROM `#__iconnect_videos` WHERE userid ="'.$loginid.'"  ORDER BY id DESC';
			$db->setQuery($dbvideo);
			$video = $db->loadObjectList();
			$videoData = explode(",",str_replace('}', '', str_replace('description:', '',  str_replace('{vtype:', '', str_replace('mp4:', '', str_replace('image:', '', str_replace('title:', '', str_replace('thumb:', '', str_replace('"', '', $video['0']->video)))))))));
			$response[$result->id] = array('type' => $result->type, 'action' => $result->action, 'id' => $result->id, 'userid' => $loginid, 'cid' => $result->cid, 'vtype' => $photoData['0'], 'title' => $videoData['1'], 'description' => $videoData['2'],  'image' => $videoData['3'], 'mp4' => $videoData['4'], 'fullname' => $result->fullname, 'iname' => $result->iname, 'avatar' => $result->avatar, 'avatarm' => $result->avatarm, 'header' => $result->header, 'text' => $result->text, 'like' => $like, 'comment' => $comment, 'support' => $support );
		}
		else if($result->type == "link" && $result->action =="posted")
		{
			$dblink = 'SELECT link FROM `#__iconnect_links` WHERE userid ="'.$loginid.'"  ORDER BY id DESC';
			$db->setQuery($dblink);
			$links = $db->loadObjectList();			
			$linkData = explode("^^", str_replace('}', '', str_replace(',', '', str_replace('\/', '/', str_replace('description:', '^^', str_replace('image:', '^^', str_replace('title:', '^^', str_replace('{link:', '', str_replace('"', '', $links['0']->link)))))))));
			$linkarr = array('link' => $linkData['0'], 'title' => $linkData['1'], 'description' => $linkData['2'],  'image' => $linkData['3']);
			$response[$result->id] = array('type' => $result->type, 'action' => $result->action, 'id' => $result->id, 'userid' => $loginid, 'cid' => $result->cid, 'link' => $linkData['0'], 'title' => $linkData['1'], 'description' => $linkData['2'],  'image' => $linkData['3'], 'fullname' => $result->fullname, 'iname' => $result->iname, 'avatar' => $result->avatar, 'avatarm' => $result->avatarm, 'header' => $result->header, 'text' => $result->text, 'like' => $like, 'comment' => $comment, 'support' => $support );
		}
		else if($result->type == "board" && $result->action =="posted")
		{
			$dbboard = 'SELECT title, description, cover, thumb FROM `#__iconnect_boards` WHERE userid ="'.$loginidloginid.'"  ORDER BY id DESC';
			$db->setQuery($dbboard);
			$boards = $db->loadObjectList();
			$boardData= $boards['0'];
			$response[$result->id] = array('type' => $result->type, 'action' => $result->action, 'id' => $result->id, 'userid' => $loginidloginid, 'cid' => $result->cid, 'title' => $boardData->title, 'description' => $boardData->description, 'cover' => $boardData->cover, 'thumb' => $boardData->thumb, 'fullname' => $result->fullname, 'iname' => $result->iname, 'avatar' => $result->avatar, 'avatarm' => $result->avatarm, 'header' => $result->header, 'text' => $result->text, 'like' => $like, 'comment' => $comment, 'support' => $support );

		}
		else
		{
			$dbboard = 'SELECT title, description, cover, thumb FROM `#__iconnect_boards` WHERE userid ="'.$loginid.'"  ORDER BY id DESC';
			$db->setQuery($dbboard);
			$otherD = $db->loadObjectList();
			$boardData= $otherD['0'];
			$response[$result->id] = array('type' => $result->type, 'action' => $result->action, 'id' => $result->id, 'userid' => $loginid, 'cid' => $result->cid, 'fullname' => $result->fullname, 'iname' => $result->iname, 'avatar' => $result->avatar, 'avatarm' => $result->avatarm, 'header' => $result->header, 'text' => $result->text, 'like' => $like, 'comment' => $comment, 'support' => $support );
		}		
	}
	$lastidquery = 'SELECT id FROM `#__iconnect_activities` ORDER BY id DESC LIMIT 1';
	$db->setQuery($lastidquery);
	$lastid = $db->loadObjectList();
	$response['total'] = $lastid['0'];
	// echo "<pre>";
	// print_r($response);
	echo json_encode($response);
	exit;
}

function profileCover($loginid) {	

	$response = array();

	$db =& JFactory::getDBO();
	$query = $db->getQuery(true);

	$dbprofile = 'SELECT * FROM `#__iconnect_profiles` WHERE userid ='.$loginid;
	$db->setQuery($dbprofile);
	$profileData = $db->loadObjectList();
	$response['profile'] = $profileData[0];

	$dbfriends = 'SELECT * FROM `#__iconnect_friends` WHERE user_id ='.$loginid.' AND status = 1';
	$db->setQuery($dbfriends);
	$db->query();
	$numFriends = $db->getNumRows();
	$response['friends'] = $numFriends;

	$dbfollowers = 'SELECT * FROM `#__iconnect_followers` WHERE follower_id ='.$loginid.' AND status = 1';
	$db->setQuery($dbfollowers);
	$db->query();
	$numFollowers = $db->getNumRows();
	$response['followers'] = $numFollowers;

	$dbcircles = 'SELECT * FROM `#__iconnect_circles` WHERE userid ='.$loginid;
	$db->setQuery($dbcircles);
	$db->query();
	$numCircles = $db->getNumRows();
	$response['circles'] = $numCircles;

	$dblikes = 'SELECT * FROM `#__iconnect_likes` WHERE cid ='.$loginid.' AND element = "profile"';
	$db->setQuery($dblikes);
	$db->query();
	$numLikes = $db->getNumRows();
	$response['likes'] = $numLikes;

	$dbfollowing = 'SELECT * FROM `#__iconnect_followers` WHERE user_id ='.$loginid.' AND status = 1';
	$db->setQuery($dbfollowing);
	$db->query();
	$numFollowing = $db->getNumRows();
	$response['following'] = $numFollowing;

	echo json_encode($response);
	exit;
}

function profileeditContent($loginid) {
	$db =& JFactory::getDBO();
	$query = $db->getQuery(true);
	$published = '1';
		
	$dbprofile = 'SELECT * FROM `#__iconnect_profiles` WHERE userid ='.$loginid;
	$db->setQuery($dbprofile);
	$profileData = $db->loadObjectList();

	$response = $profileData[0];

	// echo "<pre>";
	// print_r($profileData[0]);

	echo json_encode($response);
	exit;
}

function profileEditsave($loginid, $curfullname, $curiname, $motto) {

	$db =& JFactory::getDBO();
	$query = $db->getQuery(true);
	$published = '1';

	$dbeditprofile = "UPDATE #__iconnect_profiles SET fullname='".$curfullname."', iname='".$curiname."', motto='".$motto."' WHERE userid='".$loginid."'";
	$db->setQuery($dbeditprofile);
	$dbSuccess = $db->query();

	if($dbSuccess) {
		echo "success";
	}
	else {
		echo "failed";
	}
	exit;
}

function imageupload($loginid, $date){

	$length = 35;
	$randomString = substr(str_shuffle("0123456789abcdefghijklmnopqrstuvwxyz"), 0, $length);
	$tmp_name = $_FILES['image']['tmp_name'];
	$new_image_name = $randomString."-".$_FILES['image']['name'];
	$dir = 'images/icphotos/'.$loginid;
	if( is_dir( $dir ) ) {
	    echo "The Directory {$dir} exists";
	}
	else {
		mkdir($dir, 0777, true);
	}
	$path_to_file = 'images/icphotos/'.$loginid. '/'.$new_image_name;
	move_uploaded_file($tmp_name, $path_to_file);

	$photo = '{"photo":"'.$new_image_name.'","thumb":"'.$new_image_name.'"}';
	$published = '1';
	$albumid = "0";
	$acl = "f0";
	$accesstype	 = "0";
	$accessfee = "0";
	$ap = " ";
	$location = " ";
	$hashtags = " ";
	$mentions = " ";
	$text = " ";
	$featured = "0";
	$circleid = "0";
	$wallid = "0";

	$db = JFactory::getDBO();
	$db->getQuery(true);
	$db->setQuery("INSERT INTO `#__iconnect_photos` (`id`,`albumid`,`photo`,`userid`,`acl`,`accesstype`,`accessfee`,`accesspreview`,`date`,`location`,`hashtags`,`mentions`,`text`,`published`,`featured`,`circleid`,`wallid`) VALUES ('', '".$albumid."','".$photo."' , '".$loginid."' , '".$acl."' , '".$accesstype."' ,'".$accessfee."' ,'".$ap."' , '".$date."' , '".$location."' , '".$hashtags."' , '".$mentions."' , '".$text."' , '".$published."' , '".$featured."' ,'".$circleid."' , '".$wallid."')");

	if($db->query())
	{
		$cid = $db->insertid();

		$db = JFactory::getDBO(); 
		$db->getQuery(true);

		$db->setQuery('INSERT INTO `#__iconnect_activities` (`id`, `user_id`, `published`,`type`,`action`,`item`,`location`,`acl`, `cid`, `date`, `accesstype`,`accesspreview`,`text`,`hashtags`,`circleid`,`wallid`) VALUES ("", "'.$loginid.'", "'.$published.'", "photos", "posted" ,"'.$istartdate.'", "'.$location.'",  "'.$acl.'", "'.$cid.'", "'.$date.'", "'.$accesstype.'", "'.$ap.'", "'.$text.'", "'.$hashtags.'","'.$circleid.'","'.$wallid.'")');

		if($db->query()){
			$newid = $db->insertid();
			echo "true";
		} 
	}
	else 
	{
		echo "false";
	}

	exit;
} 

function avatarupload($loginid, $date){

	$length = 32;
	$randomString = substr(str_shuffle("0123456789abcdefghijklmnopqrstuvwxyz"), 0, $length);
	$tmp_name = $_FILES['image']['tmp_name'];
	$new_image_name = "avatar.".$randomString."-".$_FILES['image']['name'];
	$dir = 'images/icprofiles/'.$loginid;
	if( is_dir( $dir ) ) {
	    echo "The Directory {$dir} exists";
	}
	else {
		mkdir($dir, 0777, true);
	}
	$path_to_file = 'images/icprofiles/'.$loginid. '/'.$new_image_name;
	if(move_uploaded_file($tmp_name, $path_to_file)){

		$published = '1';
		$albumid = "0";
		$acl = "f0";
		$accesstype	 = "0";
		$accessfee = "0";
		$ap = " ";
		$location = " ";
		$hashtags = " ";
		$mentions = " ";
		$text = " ";
		$featured = "0";
		$circleid = "0";
		$wallid = "0";

		$db = JFactory::getDBO();
		$db->getQuery(true);
		//$query0 = "UPDATE #__iconnect_profiles SET avatar= '".$new_image_name."', thumb= '".$new_image_name."' WHERE userid='".$loginid."'";
			
		$db->setQuery("UPDATE #__iconnect_profiles SET avatar= '".$new_image_name."', thumb= '".$new_image_name."' WHERE userid='".$loginid."'");

		if($db->query())
		{
			$cid = $loginid;

			$db = JFactory::getDBO(); 
			$db->getQuery(true);

			$db->setQuery('INSERT INTO `#__iconnect_activities` (`id`, `user_id`, `published`,`type`,`action`,`item`,`location`,`acl`, `cid`, `date`, `accesstype`,`accesspreview`,`text`,`hashtags`,`circleid`,`wallid`) VALUES ("", "'.$loginid.'", "'.$published.'", "profile", "newavatar" ,"'.$istartdate.'", "'.$location.'",  "'.$acl.'", "'.$cid.'", "'.$date.'", "'.$accesstype.'", "'.$ap.'", "'.$text.'", "'.$hashtags.'","'.$circleid.'","'.$wallid.'")');

			if($db->query()){
				$newid = $db->insertid();
				echo "true";
			} 
		}
		else 
		{
			echo "false";
		}
	}

	exit;
} 


function headerupload($loginid, $date){

	$length = 32;
	$randomString = substr(str_shuffle("0123456789abcdefghijklmnopqrstuvwxyz"), 0, $length);
	$tmp_name = $_FILES['image']['tmp_name'];
	$new_image_name = "header.".$randomString."-".$_FILES['image']['name'];
	$dir = 'images/icprofiles/'.$loginid;
	if( is_dir( $dir ) ) {
	    echo "The Directory {$dir} exists";
	}
	else {
		mkdir($dir, 0777, true);
	}
	$path_to_file = 'images/icprofiles/'.$loginid. '/'.$new_image_name;
	move_uploaded_file($tmp_name, $path_to_file);

	$photo = '{"photo":"'.$new_image_name0.'","thumb":"'.$new_image_name2.'"}';
	$published = '1';
	$albumid = "0";
	$acl = "f0";
	$accesstype	 = "0";
	$accessfee = "0";
	$ap = " ";
	$location = " ";
	$hashtags = " ";
	$mentions = " ";
	$text = " ";
	$featured = "0";
	$circleid = "0";
	$wallid = "0";

	$db = JFactory::getDBO();
	$db->getQuery(true);
	$db->setQuery("UPDATE #__iconnect_profiles SET header= '".$new_image_name."' WHERE userid='".$loginid."'");

	if($db->query())
	{
		$cid = $loginid;

		$db = JFactory::getDBO(); 
		$db->getQuery(true);

		$db->setQuery('INSERT INTO `#__iconnect_activities` (`id`, `user_id`, `published`,`type`,`action`,`item`,`location`,`acl`, `cid`, `date`, `accesstype`,`accesspreview`,`text`,`hashtags`,`circleid`,`wallid`) VALUES ("", "'.$loginid.'", "'.$published.'", "profile", "newcover" ,"'.$istartdate.'", "'.$location.'",  "'.$acl.'", "'.$cid.'", "'.$date.'", "'.$accesstype.'", "'.$ap.'", "'.$text.'", "'.$hashtags.'","'.$circleid.'","'.$wallid.'")');

		if($db->query()){
			$newid = $db->insertid();
			echo "true";
		} 
	}
	else 
	{
		echo "false";
	}

	exit;
} 


function videoupload($loginid, $date) {   
	echo "<pre>";
	print_r($_FILES);


	$length = 35;
	$randomString = substr(str_shuffle("0123456789abcdefghijklmnopqrstuvwxyz"), 0, $length);
	$tmp_name = $_FILES['video']['tmp_name'];
	$new_image_name = $randomString."-".$_FILES['video']['name'];
	$dir = 'images/icvideos/'.$loginid;
	if( is_dir( $dir ) ) {
	    echo "The Directory {$dir} exists";
	}
	else {
		mkdir($dir, 0777, true);
	}
	$path_to_file = 'images/icphotos/'.$loginid. '/'.$new_image_name;
	move_uploaded_file($tmp_name, $path_to_file);

	//$video = '{"vtype":"'.$data['provider_name'].'","title":"'.$data['title'].'","description":"'.$data['title'].' For more videos click on '.$data['author_url'].'","image":"'.$new_image_name.'","link":"'.$url.'"}';
	$published = '1';
	$albumid = "0";
	$acl = "f0";
	$accesstype	 = "0";
	$accessfee = "0";
	$ap = " ";
	$location = " ";
	$hashtags = " ";
	$mentions = " ";
	$text = " ";
	$featured = "0";
	$circleid = "0";
	$wallid = "0";
	$catid = "0";

	$db = JFactory::getDBO();
	$db->getQuery(true);
	$db->setQuery("INSERT INTO `#__iconnect_videos` (`id`,`catid`,`userid`,`acl`,`accesstype`,`accessfee`,`accesspreview`,`date`,`location`,`hashtags`,`mentions`,`text`, `video`,`published`,`featured`,`circleid`,`wallid`) VALUES ('', '".$catid."', '".$loginid."' , '".$acl."' , '".$accesstype."' ,'".$accessfee."' ,'".$ap."' , '".$date."' , '".$location."' , '".$hashtags."' , '".$mentions."' , '".$text."' , '".$video."' , '".$published."' , '".$featured."' ,'".$circleid."' , '".$wallid."')");

	if($db->query())
	{
		$cid = $db->insertid();

		$db = JFactory::getDBO(); 
		$db->getQuery(true);

		$db->setQuery('INSERT INTO `#__iconnect_activities` (`id`, `user_id`, `published`,`type`,`action`,`item`,`location`,`acl`, `cid`, `date`, `accesstype`,`accesspreview`,`text`,`hashtags`,`circleid`,`wallid`) VALUES ("", "'.$loginid.'", "'.$published.'", "video", "posted" ,"'.$istartdate.'", "'.$location.'",  "'.$acl.'", "'.$cid.'", "'.$date.'", "'.$accesstype.'", "'.$ap.'", "'.$text.'", "'.$hashtags.'","'.$circleid.'","'.$wallid.'")');

		if($db->query()){
			$newid = $db->insertid();
			echo "true";
		} 
	}
	else 
	{
		echo "false";
	}

	exit;
}

function fetchvideo($loginid, $date, $url) {

	//echo "<br /> Loginid = ".$loginid."<br /> Date = ".$date."<br /> url = ".$url."<br />";

	$video_url = 'http://www.youtube.com/oembed?format=json&url=' . $url;
	$data = json_decode(file_get_contents($video_url), true);
	
	$ext = pathinfo($data['thumbnail_url'], PATHINFO_EXTENSION);
	
	$contents = file_get_contents($data['thumbnail_url']);

	$length = 32;
	$randomString = substr(str_shuffle("0123456789abcdefghijklmnopqrstuvwxyz"), 0, $length);
	$new_image_name = "stream.".$randomString."-video.".$ext;
	$dir = 'images/icvideos/'.$loginid;
	if( is_dir( $dir ) ) {
	    echo "The Directory {$dir} exists";
	}
	else {
		mkdir($dir, 0777, true);
	}
	$path_to_file = 'images/icvideos/'.$loginid. '/'.$new_image_name;

	$contents = file_get_contents($data['thumbnail_url']);

	file_put_contents($path_to_file, $contents);

	$video = '{"vtype":"'.$data['provider_name'].'","title":"'.$data['title'].'","description":"'.$data['title'].' For more videos click on '.$data['author_url'].'","image":"'.$new_image_name.'","link":"'.$url.'"}';
	$published = '1';
	$albumid = "0";
	$acl = "f0";
	$accesstype	 = "0";
	$accessfee = "0";
	$ap = " ";
	$location = " ";
	$hashtags = " ";
	$mentions = " ";
	$text = " ";
	$featured = "0";
	$circleid = "0";
	$wallid = "0";
	$catid = "0";

	
	$db = JFactory::getDBO();
	$db->getQuery(true);
	$db->setQuery("INSERT INTO `#__iconnect_videos` (`id`,`catid`,`userid`,`acl`,`accesstype`,`accessfee`,`accesspreview`,`date`,`location`,`hashtags`,`mentions`,`text`, `video`,`published`,`featured`,`circleid`,`wallid`) VALUES ('', '".$catid."', '".$loginid."' , '".$acl."' , '".$accesstype."' ,'".$accessfee."' ,'".$ap."' , '".$date."' , '".$location."' , '".$hashtags."' , '".$mentions."' , '".$text."' , '".$video."' , '".$published."' , '".$featured."' ,'".$circleid."' , '".$wallid."')");

	if($db->query())
	{
		$cid = $db->insertid();

		$db = JFactory::getDBO(); 
		$db->getQuery(true);

		$db->setQuery('INSERT INTO `#__iconnect_activities` (`id`, `user_id`, `published`,`type`,`action`,`item`,`location`,`acl`, `cid`, `date`, `accesstype`,`accesspreview`,`text`,`hashtags`,`circleid`,`wallid`) VALUES ("", "'.$loginid.'", "'.$published.'", "video", "posted" ,"'.$istartdate.'", "'.$location.'",  "'.$acl.'", "'.$cid.'", "'.$date.'", "'.$accesstype.'", "'.$ap.'", "'.$text.'", "'.$hashtags.'","'.$circleid.'","'.$wallid.'")');

		if($db->query()){
			$newid = $db->insertid();
			echo "true";
		} 
	}
	else 
	{
		echo "false";
	}

	exit;
}

function searchFront($loginid, $date, $type) {

	$db =& JFactory::getDBO();
	$query = $db->getQuery(true);
	$published = '1';

	if ($type == "f0") {
		$dbemail = 'SELECT p.*, u.fullname, u.iname, u.avatar, u.header, u.thumb as avatarm FROM `#__iconnect_activities` as p LEFT JOIN `#__iconnect_profiles` as u ON ('.$db->quoteName('u.userid').' = '.$db->quoteName('p.user_id').') WHERE '.$db->quoteName('p.published').' = '. $db->quote($published).' AND '.$db->quoteName('p.acl').' = '. $db->quote($type).'ORDER BY'.$db->quoteName('p.id').' DESC';
	}	
	else {
		$dbemail = 'SELECT p.*, u.fullname, u.iname, u.avatar, u.header, u.thumb as avatarm FROM `#__iconnect_activities` as p LEFT JOIN `#__iconnect_profiles` as u ON ('.$db->quoteName('u.userid').' = '.$db->quoteName('p.user_id').') WHERE '.$db->quoteName('p.published').' = '. $db->quote($published).' AND '.$db->quoteName('p.acl').' = '. $db->quote($type).' AND '.$db->quoteName('p.cid').' = '. $db->quote($loginid).' ORDER BY'.$db->quoteName('p.id').' DESC';
	}	
 
	$db->setQuery($dbemail);
	$results = $db->loadObjectList();
	$response = array();
	foreach ($results as $key => $result) {
		if($result->type == "photos" && $result->action =="posted")
		{
			$dbphoto = 'SELECT photo FROM `#__iconnect_photos` WHERE userid ="'.$result->user_id.'" AND id ="'.$result->cid.'" ORDER BY id DESC';
			$db->setQuery($dbphoto);
			$photos = $db->loadObjectList();
			$photoData= explode(",",str_replace('}', '', str_replace('{photo:', '', str_replace('thumb:', '', str_replace('"', '', $photos['0']->photo)))));
			$response[$result->id] = array('type' => $result->type, 'action' => $result->action, 'id' => $result->id, 'userid' => $result->user_id, 'cid' => $result->cid, 'photo' => $photoData['0'], 'thumb' => $photoData['1'], 'fullname' => $result->fullname, 'iname' => $result->iname, 'avatar' => $result->avatar, 'avatarm' => $result->avatarm,'header' => $result->header, 'text' => $result->text );
		}
		else if($result->type == "circle" && $result->action =="posted")
		{

			$dbcircle = 'SELECT title, cover, thumb FROM `#__iconnect_circles` WHERE userid ="'.$result->user_id.'" AND id ="'.$result->cid.'" ORDER BY id DESC';
			$db->setQuery($dbcircle);
			$circle = $db->loadObjectList();
			$circleData= $circle['0'];
			$response[$result->id] = array('type' => $result->type, 'action' => $result->action, 'id' => $result->id, 'userid' => $result->user_id, 'cid' => $result->cid, 'title' => $circleData->title, 'cover' => $circleData->cover, 'thumb' => $circleData->thumb, 'fullname' => $result->fullname, 'iname' => $result->iname, 'avatar' => $result->avatar, 'avatarm' => $result->avatarm,'header' => $result->header, 'text' => $result->text );
		}
		else if($result->type == "profile" && $result->action =="newcover")
		{
			$response[$result->id] = array('type' => $result->type, 'action' => $result->action, 'id' => $result->id, 'userid' => $result->user_id, 'cid' => $result->cid, 'fullname' => $result->fullname, 'iname' => $result->iname, 'avatar' => $result->avatar, 'avatarm' => $result->avatarm, 'header' => $result->header, 'text' => $result->text );
		}
		else if($result->type == "profile" && $result->action =="newavatar")
		{
			$response[$result->id] = array('type' => $result->type, 'action' => $result->action, 'id' => $result->id, 'userid' => $result->user_id, 'cid' => $result->cid, 'fullname' => $result->fullname, 'iname' => $result->iname, 'avatar' => $result->avatar, 'avatarm' => $result->avatarm, 'header' => $result->header, 'text' => $result->text );
		}
		else if(($result->type == "localvideo" || $result->type == "video" ) && $result->action =="posted")
		{
			$dbvideo = 'SELECT video FROM `#__iconnect_videos` WHERE userid ="'.$result->user_id.'" AND id ="'.$result->cid.'" ORDER BY id DESC';
			$db->setQuery($dbvideo);
			$video = $db->loadObjectList();
			$videoData = explode(",",str_replace('}', '', str_replace('description:', '',  str_replace('{vtype:', '', str_replace('mp4:', '', str_replace('image:', '', str_replace('title:', '', str_replace('thumb:', '', str_replace('"', '', $video['0']->video)))))))));
			$response[$result->id] = array('type' => $result->type, 'action' => $result->action, 'id' => $result->id, 'userid' => $result->user_id, 'cid' => $result->cid, 'vtype' => $photoData['0'], 'title' => $videoData['1'], 'description' => $videoData['2'],  'image' => $videoData['3'], 'mp4' => $videoData['4'], 'fullname' => $result->fullname, 'iname' => $result->iname, 'avatar' => $result->avatar, 'avatarm' => $result->avatarm, 'header' => $result->header, 'text' => $result->text );
		}
		else if($result->type == "link" && $result->action =="posted")
		{
			$dblink = 'SELECT link FROM `#__iconnect_links` WHERE userid ="'.$result->user_id.'" AND id ="'.$result->cid.'" ORDER BY id DESC';
			$db->setQuery($dblink);
			$links = $db->loadObjectList();
			$linkData = explode("^^", str_replace('}', '', str_replace(',', '', str_replace('\/', '/', str_replace('description:', '^^', str_replace('image:', '^^', str_replace('title:', '^^', str_replace('{link:', '', str_replace('"', '', $links['0']->link)))))))));
			$linkarr = array('link' => $linkData['0'], 'title' => $linkData['1'], 'description' => $linkData['2'],  'image' => $linkData['3']);
			$response[$result->id] = array('type' => $result->type, 'action' => $result->action, 'id' => $result->id, 'userid' => $result->user_id, 'cid' => $result->cid, 'link' => $linkData['0'], 'title' => $linkData['1'], 'description' => $linkData['2'],  'image' => $linkData['3'], 'fullname' => $result->fullname, 'iname' => $result->iname, 'avatar' => $result->avatar, 'avatarm' => $result->avatarm, 'header' => $result->header, 'text' => $result->text );
		}
		else if($result->type == "board" && $result->action =="posted")
		{
			$dbboard = 'SELECT title, description, cover, thumb FROM `#__iconnect_boards` WHERE userid ="'.$result->user_id.'" AND id ="'.$result->cid.'" ORDER BY id DESC';
			$db->setQuery($dbboard);
			$boards = $db->loadObjectList();
			$boardData= $boards['0'];
			$response[$result->id] = array('type' => $result->type, 'action' => $result->action, 'id' => $result->id, 'userid' => $result->user_id, 'cid' => $result->cid, 'title' => $boardData->title, 'description' => $boardData->description, 'cover' => $boardData->cover, 'thumb' => $boardData->thumb, 'fullname' => $result->fullname, 'iname' => $result->iname, 'avatar' => $result->avatar, 'avatarm' => $result->avatarm, 'header' => $result->header, 'text' => $result->text );

		}
		else
		{
			$dbboard = 'SELECT title, description, cover, thumb FROM `#__iconnect_boards` WHERE userid ="'.$result->user_id.'" AND id ="'.$result->cid.'" ORDER BY id DESC';
			$db->setQuery($dbboard);
			$otherD = $db->loadObjectList();
			$boardData= $otherD['0'];
			$response[$result->id] = array('type' => $result->type, 'action' => $result->action, 'id' => $result->id, 'userid' => $result->user_id, 'cid' => $result->cid, 'fullname' => $result->fullname, 'iname' => $result->iname, 'avatar' => $result->avatar, 'avatarm' => $result->avatarm, 'header' => $result->header, 'text' => $result->text );
		}
	}
	$lastidquery = 'SELECT id FROM `#__iconnect_activities` ORDER BY id DESC LIMIT 1';

	$db->setQuery($lastidquery);
	$lastid = $db->loadObjectList();
	$response['total'] = $lastid['0'];
	echo json_encode($response);
	exit;
}

function membersContent($loginid) {
 	$db =& JFactory::getDBO();
	$query = $db->getQuery(true);
	$likestatus = "1";
	$published = "1";
	$supportstatus = "1";
		
	$dbemail = 'SELECT * FROM `#__iconnect_profiles` ORDER BY'.$db->quoteName('id').' DESC';
	$db->setQuery($dbemail);
	$results = $db->loadObjectList();

	$response = array();

	foreach($results as $result){		

		$likes = 'SELECT * FROM `#__iconnect_likes` WHERE `cid` ="'.$result->userid.'" AND `like` = "'.$likestatus.'" ORDER BY id DESC';
		$db->setQuery($likes);
		$postLike = $db->loadObjectList();
		$db->query();
		$like = $db->getNumRows();

		$comments = 'SELECT * FROM `#__iconnect_comments` WHERE `cid` ="'.$result->userid.'" AND `published` = "'.$published.'" ORDER BY id DESC';
		$db->setQuery($comments);
		$postComment = $db->loadObjectList();
		$db->query();
		$comment = $db->getNumRows();

		$supports = 'SELECT * FROM `#__iconnect_support` WHERE `cid` ="'.$result->userid.'" AND `support` = "'.$supportstatus.'" ORDER BY id DESC';
		$db->setQuery($supports);
		$postSupport = $db->loadObjectList();
		$db->query();
		$support = $db->getNumRows();

		$response[$result->id] = array('id' => $result->id, 'profiletype' => $result->profiletype, 'iname' => $result->iname, 'fullname' => $result->fullname, 'avatar' => $result->avatar, 'header' => $result->header, 'thumb' => $result->thumb, 'userid' => $result->userid, 'online' => $circleData->online, 'logindate' => $result->logindate, 'status' => $result->status, 'wallacl' => $result->wallacl, 'motto' => $result->motto,'featured' => $result->featured,'like' => $like, 'comment' => $comment, 'support' => $support ); 
	}

	$lastidquery = 'SELECT id FROM `#__iconnect_profiles` ORDER BY id DESC LIMIT 1';
	$db->setQuery($lastidquery);
	$lastid = $db->loadObjectList();
	$response['total'] = $lastid['0'];
	// echo "<pre>"; print_r($response);

	echo json_encode($response);
	exit;
 }

function  matchupsContent($loginid) {
 	$db =& JFactory::getDBO();
	$query = $db->getQuery(true);
	$published = 1;
		
	$dbemail = 'SELECT * FROM `#__iconnect_matchups` WHERE '.$db->quoteName('published').' = '. $db->quote($published).' ORDER BY'.$db->quoteName('id').' DESC';
	$db->setQuery($dbemail);
	$results = $db->loadObjectList();

	$response = array();

	foreach($results as $result){	

		$dbiname = 'SELECT iname, fullname, thumb FROM `#__iconnect_profiles` WHERE userid ="'.$result->userid.'"';
		$db->setQuery($dbiname);
		$inameData = $db->loadObjectList();
		$iname = $inameData['0']->iname;
		$fullname = $inameData['0']->fullname;
		$userthumb = $inameData['0']->thumb;

		$response[$result->id] = array('id' => $result->id, 'title' => $result->title, 'description' => $result->description, 'cover' => $result->cover, 'thumb' => $result->thumb, 'userid' => $result->userid, 'acl' => $result->acl, 'date' => $result->date, 'catids' => $circleData->catids, 'qlist' => $result->qlist, 'featured' => $result->featured, 'iname' => $iname, 'userthumb' => $userthumb, "fullname" => $fullname ); 
	}
	$lastidquery = 'SELECT id FROM `#__iconnect_matchups` ORDER BY id DESC LIMIT 1';
	$db->setQuery($lastidquery);
	$lastid = $db->loadObjectList();
	$response['total'] = $lastid['0'];
	//echo "<pre>"; print_r($response);
	 
	echo json_encode($response);
	exit;
 }

function  circlesContent($loginid) {
 	$db =& JFactory::getDBO();
	$query = $db->getQuery(true);
	$published = 1;
		
	$dbemail = 'SELECT * FROM `#__iconnect_circles` WHERE '.$db->quoteName('published').' = '. $db->quote($published).' ORDER BY'.$db->quoteName('id').' DESC';
	$db->setQuery($dbemail);
	$results = $db->loadObjectList();

	$response = array();

	$dbcircleaccess = 'SELECT circleid FROM `#__iconnect_circle_access` WHERE profileid ="'.$loginid.'"';
	$db->setQuery($dbcircleaccess);
	$circleaccess = $db->loadObjectList();


	foreach ($circleaccess as $circleAccess) {
		$response['circle'][$circleAccess->circleid] = $circleAccess->circleid;
	}

	foreach($results as $result){	
		$dbiname = 'SELECT iname, fullname, thumb FROM `#__iconnect_profiles` WHERE userid ="'.$result->userid.'"';
		$db->setQuery($dbiname);
		$inameData = $db->loadObjectList();
		$iname = $inameData['0']->iname;
		$fullname = $inameData['0']->fullname;
		$userthumb = $inameData['0']->thumb;

		$iname = $inameData['0']->iname;
		$fullname = $inameData['0']->fullname;
		$userthumb = $inameData['0']->thumb;

		if(($result->userid == $loginid  && ($result->acl == "f2" || $result->acl == "f3" || $result->acl == "f4" || $result->acl == "f5")) || $result->acl == "f0" || $result->acl == "f1") { 
	 		$response[$result->id] = array('id' => $result->id, 'userid' => $result->userid, 'circlelist' => $result->circlelist, 'acl' => $result->acl, 'title' => $result->title, 'description' => $result->description, 'cover' => $result->cover, 'thumb' => $result->thumb, 'type' => $circleData->type, 'date' => $result->date, 'hashtags' => $result->hashtags, 'featured' => $result->featured, 'iname' => $iname, 'userthumb' => $userthumb, "fullname" => $fullname ); 
	 	}
	}
	$lastidquery = 'SELECT id FROM `#__iconnect_circles` ORDER BY id DESC LIMIT 1';
	$db->setQuery($lastidquery);
	$lastid = $db->loadObjectList();
	$response['total'] = $lastid['0'];
	// echo "<pre>"; print_r($response);
	 
	echo json_encode($response);
	exit;
 }
 
function removecircle($circleid, $loginid){
		
	$db = JFactory::getDbo();
 	$query = $db->getQuery(true);
	
	$conditions = array(
	    $db->quoteName('profileid') . ' = '. $db->quote($loginid), 
	    $db->quoteName('circleid') . ' = ' . $db->quote($circleid)
	);
	 
	$query->delete($db->quoteName('#__iconnect_circle_access'));
	$query->where($conditions);
	$db->setQuery($query);	 
	$result = $db->execute();

	if($result) {
		circlesContent($loginid);
	} else {
		echo "Failed";
	}
	exit;
}

function addcircle($circleid, $loginid){

	$db = JFactory::getDbo();
	$query = $db->getQuery(true);

	$columns = array('profileid', 'status', 'circleid');

	$values = array($db->quote($loginid), $db->quote('1'), $db->quote($circleid));

	$query
	    ->insert($db->quoteName('#__iconnect_circle_access'))
	    ->columns($db->quoteName($columns))
	    ->values(implode(',', $values));

	$db->setQuery($query);
	$result = $db->execute();

	if($result) {
		circlesContent($loginid);
	} else {
		echo "Failed";
	}
	exit;
}

function viewcirclemembers($circleid, $loginid) {

	$db = JFactory::getDbo();
	$query = $db->getQuery(true);

	$query->select($db->quoteName('profileid'));
	$query->from($db->quoteName('#__iconnect_circle_access'));
	$query->where($db->quoteName('circleid') . ' LIKE '. $db->quote($circleid));
	$query->order('profileid DESC');

	$db->setQuery($query);
	$results = $db->loadObjectList();

	$response = array ();
	$i = 0;
	foreach ($results as $key => $result) {
		$i++;
		$query1 = $db->getQuery(true);

		$userid = $result->profileid;
		$query1->select($db->quoteName(array('fullname', 'iname', 'avatar' , 'thumb')));
		$query1->from($db->quoteName('#__iconnect_profiles'));
		$query1->where($db->quoteName('userid') . ' LIKE '. $db->quote($userid));
		$query1->order('userid DESC');

		$db->setQuery($query1);
		$users = $db->loadObjectList();

		$iname = $users[0]->iname;
		$fullname = $users[0]->fullname;
		$avatar = $users[0]->avatar;
		$thumb = $users[0]->thumb;

		$response[$i] = array('circleid' => $circleid, 'userid' => $userid, 'iname' => $iname, "fullname" => $fullname, "avatar" => $avatar, "thumb" => $thumb ); 
	}
	$response['total'] = $i;
	echo json_encode($response);
	exit;
}

function removeCcircle($circleid, $loginid, $circleuserid) {
	$db = JFactory::getDbo();
 	$query = $db->getQuery(true);
	
	$conditions = array(
	    $db->quoteName('profileid') . ' = '. $db->quote($circleuserid), 
	    $db->quoteName('circleid') . ' = ' . $db->quote($circleid)
	);
	 
	$query->delete($db->quoteName('#__iconnect_circle_access'));
	$query->where($conditions);
	$db->setQuery($query);	 
	$result = $db->execute();

	if($result) {
		viewcirclemembers($circleid, $loginid);
	} else {
		echo "Failed";
	}
	exit;
}

function viewcircle($circleid, $loginid) {
	$db =& JFactory::getDBO();
	$query = $db->getQuery(true);
	$published = 1;
	$response = array();
		
	$dbcircle = 'SELECT * FROM `#__iconnect_circles` WHERE '.$db->quoteName('id').' = '. $db->quote($circleid).' AND '.$db->quoteName('published').' = '. $db->quote($published).' ORDER BY'.$db->quoteName('id').' DESC';
	$db->setQuery($dbcircle);
	$results = $db->loadObjectList();
	$result = $results[0];
	$response['circleInfo'] = array('id' => $result->id, 'userid' => $result->userid, 'circlelist' => $result->circlelist, "acl" => $result->acl, "title" => $result->title, "description" => $result->description, 'cover' => $result->cover, 'thumb' => $result->thumb, 'type' => $result->type, 'date' => $result->date, 'hashtags' => $result->hashtags, 'featured' => $result->featured );

	$dbcircleuser = 'SELECT * FROM `#__iconnect_profiles` WHERE userid ="'.$result->userid.'"';
	$db->setQuery($dbcircleuser);
	$circlecreater = $db->loadObjectList();
	$ccdata  = $circlecreater[0];
	$response['createrinfo'] = array('id' => $ccdata->id, 'profiletype' => $ccdata->profiletype, 'iname' => $ccdata->iname, "fullname" => $ccdata->fullname, "avatar" => $ccdata->avatar, "header" => $ccdata->header, 'thumb' => $ccdata->thumb, 'userid' => $ccdata->userid, 'online' => $ccdata->online, 'logindate' => $ccdata->logindate, 'status' => $ccdata->status, 'wallacl' => $ccdata->wallacl, 'motto' => $ccdata->motto, 'featured' => $ccdata->featured );

	$dbcircleaccess ='SELECT p.*, u.fullname, u.iname, u.avatar, u.header, u.thumb as avatarm FROM `#__iconnect_activities` as p LEFT JOIN `#__iconnect_profiles` as u ON ('.$db->quoteName('u.userid').' = '.$db->quoteName('p.user_id').') WHERE '.$db->quoteName('p.circleid').' = '.$db->quote($circleid).' AND '.$db->quoteName('p.published').' = '. $db->quote($published).'ORDER BY'.$db->quoteName('p.id').' DESC';

	$db->setQuery($dbcircleaccess);
	$circleactivity = $db->loadObjectList();

	echo "<pre>";
	print_r($circleactivity);

	if (!empty($circleactivity)) {
	
		foreach($circleactivity as $activity) {	
			$likes = 'SELECT * FROM `#__iconnect_likes` WHERE `cid` ="'.$activity->cid.'" AND `like` = "'.$likestatus.'" ORDER BY id DESC';
			$db->setQuery($likes);
			$postLike = $db->loadObjectList();
			$db->query();
			$like = $db->getNumRows();

			$comments = 'SELECT * FROM `#__iconnect_comments` WHERE `cid` ="'.$activity->cid.'" AND `published` = "'.$published.'" ORDER BY id DESC';
			$db->setQuery($comments);
			$postComment = $db->loadObjectList();
			$db->query();
			$comment = $db->getNumRows();

			if($activity->type == "photos" && $activity->action =="posted")
			{
				$dbphoto = 'SELECT photo FROM `#__iconnect_photos` WHERE userid ="'.$activity->user_id.'" AND id ="'.$activity->cid.'" ORDER BY id DESC';

				$db->setQuery($dbphoto);
				$photos = $db->loadObjectList();
				
				$photoData= explode(",",str_replace('}', '', str_replace('{photo:', '', str_replace('thumb:', '', str_replace('"', '', $photos['0']->photo)))));

				$response['activity'][$activity->id] = array('type' => $activity->type, 'action' => $activity->action, 'id' => $activity->id, 'userid' => $activity->user_id, 'cid' => $activity->cid, 'photo' => $photoData['0'], 'thumb' => $photoData['1'], 'fullname' => $activity->fullname, 'iname' => $activity->iname, 'avatar' => $activity->avatar, 'avatarm' => $activity->avatarm,'header' => $activity->header, 'text' => $activity->text, 'like' => $like, 'comment' => $comment );
			}
			else if($activity->type == "circle" && $activity->action =="posted")
			{

				$dbcircle = 'SELECT title, cover, thumb FROM `#__iconnect_circles` WHERE userid ="'.$activity->user_id.'" AND id ="'.$activity->cid.'" ORDER BY id DESC';

				$db->setQuery($dbcircle);
				$circle = $db->loadObjectList();

				$circleData= $circle['0'];

				$response['activity'][$activity->id] = array('type' => $activity->type, 'action' => $activity->action, 'id' => $activity->id, 'userid' => $activity->user_id, 'cid' => $activity->cid, 'title' => $circleData->title, 'cover' => $circleData->cover, 'thumb' => $circleData->thumb, 'fullname' => $activity->fullname, 'iname' => $activity->iname, 'avatar' => $activity->avatar, 'avatarm' => $activity->avatarm,'header' => $activity->header, 'text' => $activity->text, 'like' => $like, 'comment' => $comment );
			}
			else if($activity->type == "profile" && $activity->action =="newcover")
			{
				$response['activity'][$activity->id] = array('type' => $activity->type, 'action' => $activity->action, 'id' => $activity->id, 'userid' => $activity->user_id, 'cid' => $activity->cid, 'fullname' => $activity->fullname, 'iname' => $activity->iname, 'avatar' => $activity->avatar, 'avatarm' => $activity->avatarm, 'header' => $activity->header, 'text' => $activity->text, 'like' => $like, 'comment' => $comment );
			}
			else if($activity->type == "profile" && $activity->action =="newavatar")
			{
				$response['activity'][$activity->id] = array('type' => $activity->type, 'action' => $activity->action, 'id' => $activity->id, 'userid' => $activity->user_id, 'cid' => $activity->cid, 'fullname' => $activity->fullname, 'iname' => $activity->iname, 'avatar' => $activity->avatar, 'avatarm' => $activity->avatarm, 'header' => $activity->header, 'text' => $activity->text, 'like' => $like, 'comment' => $comment );
			}
			else if(($activity->type == "localvideo" || $activity->type == "video" ) && $activity->action =="posted")
			{
				$dbvideo = 'SELECT video FROM `#__iconnect_videos` WHERE userid ="'.$activity->user_id.'" AND id ="'.$activity->cid.'" ORDER BY id DESC';

				$db->setQuery($dbvideo);
				$video = $db->loadObjectList();

				$videoData = explode(",",str_replace('}', '', str_replace('description:', '',  str_replace('{vtype:', '', str_replace('mp4:', '', str_replace('image:', '', str_replace('title:', '', str_replace('thumb:', '', str_replace('"', '', $video['0']->video)))))))));

				$response['activity'][$activity->id] = array('type' => $activity->type, 'action' => $activity->action, 'id' => $activity->id, 'userid' => $activity->user_id, 'cid' => $activity->cid, 'vtype' => $photoData['0'], 'title' => $videoData['1'], 'description' => $videoData['2'],  'image' => $videoData['3'], 'mp4' => $videoData['4'], 'fullname' => $activity->fullname, 'iname' => $activity->iname, 'avatar' => $activity->avatar, 'avatarm' => $activity->avatarm, 'header' => $activity->header, 'text' => $activity->text, 'like' => $like, 'comment' => $comment );
			}
			else if($activity->type == "link" && $activity->action =="posted")
			{
				$dblink = 'SELECT link FROM `#__iconnect_links` WHERE userid ="'.$activity->user_id.'" AND id ="'.$activity->cid.'" ORDER BY id DESC';

				$db->setQuery($dblink);
				$links = $db->loadObjectList();
				
				$linkData = explode("^^", str_replace('}', '', str_replace(',', '', str_replace('\/', '/', str_replace('description:', '^^', str_replace('image:', '^^', str_replace('title:', '^^', str_replace('{link:', '', str_replace('"', '', $links['0']->link)))))))));

				$linkarr = array('link' => $linkData['0'], 'title' => $linkData['1'], 'description' => $linkData['2'],  'image' => $linkData['3']);

				$response['activity'][$activity->id] = array('type' => $activity->type, 'action' => $activity->action, 'id' => $activity->id, 'userid' => $activity->user_id, 'cid' => $activity->cid, 'link' => $linkData['0'], 'title' => $linkData['1'], 'description' => $linkData['2'],  'image' => $linkData['3'], 'fullname' => $activity->fullname, 'iname' => $activity->iname, 'avatar' => $activity->avatar, 'avatarm' => $activity->avatarm, 'header' => $activity->header, 'text' => $activity->text, 'like' => $like, 'comment' => $comment );
			}
			else if($activity->type == "board" && $activity->action =="posted")
			{
				$dbboard = 'SELECT title, description, cover, thumb FROM `#__iconnect_boards` WHERE userid ="'.$activity->user_id.'" AND id ="'.$activity->cid.'" ORDER BY id DESC';

				$db->setQuery($dbboard);
				$boards = $db->loadObjectList();

				$boardData= $boards['0'];

				$response['activity'][$activity->id] = array('type' => $activity->type, 'action' => $activity->action, 'id' => $activity->id, 'userid' => $activity->user_id, 'cid' => $activity->cid, 'title' => $boardData->title, 'description' => $boardData->description, 'cover' => $boardData->cover, 'thumb' => $boardData->thumb, 'fullname' => $activity->fullname, 'iname' => $activity->iname, 'avatar' => $activity->avatar, 'avatarm' => $activity->avatarm, 'header' => $activity->header, 'text' => $activity->text, 'like' => $like, 'comment' => $comment );

			}
			else
			{
				$dbboard = 'SELECT title, description, cover, thumb FROM `#__iconnect_boards` WHERE userid ="'.$activity->user_id.'" AND id ="'.$activity->cid.'" ORDER BY id DESC';

				$db->setQuery($dbboard);
				$otherD = $db->loadObjectList();

				$boardData= $otherD['0'];

				$response['activity'][$activity->id] = array('type' => $activity->type, 'action' => $activity->action, 'id' => $activity->id, 'userid' => $activity->user_id, 'cid' => $activity->cid, 'fullname' => $activity->fullname, 'iname' => $activity->iname, 'avatar' => $activity->avatar, 'avatarm' => $activity->avatarm, 'header' => $activity->header, 'text' => $activity->text, 'like' => $like, 'comment' => $comment );
			}
			
		}
	}
	else {
		$response['activity']['0'] = array();
	}

	$lastidquery = 'SELECT id FROM `#__iconnect_activities` ORDER BY id DESC LIMIT 1';

	$db->setQuery($lastidquery);
	$lastid = $db->loadObjectList();

	$response['total'] = $lastid['0'];
	// echo "<pre>"; print_r($response);
	 
	echo json_encode($response);
	exit;
}

function mymatchups($loginid) {
	$db =& JFactory::getDBO();
	$query = $db->getQuery(true);
	$published = 1;
	$response = array();
		
	$matchups = 'SELECT * FROM `#__iconnect_profile_matchups` WHERE '.$db->quoteName('uid').' = '. $db->quote($loginid).' ORDER BY'.$db->quoteName('id').' DESC';
	$db->setQuery($matchups);	
	$matchupsresults = $db->loadObjectList();
	
	$matchups = 'SELECT id FROM `#__iconnect_profile_matchups` WHERE '.$db->quoteName('uid').' = '. $db->quote($loginid).' ORDER BY'.$db->quoteName('id').' DESC LIMIT 1';
	$db->setQuery($matchups);
	$lastid = $db->loadObjectList();
	$totalrows = $lastid[0]->id;
	$response['total'] = $totalrows;

	foreach ($matchupsresults as $key => $matchupsresult) {

	    $matchupsid = $matchupsresult->matchupid;
	    $mtchupsid = $matchupsresult->id;
	    $matchupsuid = $matchupsresult->uid;
	    $matchupscid = $matchupsresult->cid;

	    $response['matchups'][$mtchupsid] = array('matchupsid' => $matchupsid, 'matchupsuid' => $matchupsuid, 'matchupscid' => $matchupscid);

	    $matchup = 'SELECT * FROM `#__iconnect_matchups` WHERE '.$db->quoteName('id').' = '. $db->quote($matchupsid).' ORDER BY'.$db->quoteName('id').' DESC';
		$db->setQuery($matchup);
		$matchupresults = $db->loadObjectList();
		$matchupresult = $matchupresults[0];



		$matchupresulttitle = $matchupresult->title;
		$matchupresultdescription = $matchupresult->description;
		$matchupresultcover = $matchupresult->cover;
		$matchupresultthumb = $matchupresult->thumb;
		$matchupresultacl = $matchupresult->acl;
		$matchupresultcatids = $matchupresult->catids;

		$response['matchup'][$mtchupsid] = array('matchuptitle' => $matchupresulttitle, 'matchupdescription' => $matchupresultdescription, 'matchupcover' => $matchupresultcover, 'matchupthumb' => $matchupresultthumb, 'matchupacl' => $matchupresultacl, 'matchupcatids' => $matchupresultcatids);

		$matchupqas = 'SELECT * FROM `#__iconnect_matchupqas` WHERE '.$db->quoteName('id').' = '. $db->quote($matchupscid).' ORDER BY'.$db->quoteName('id').' DESC';
		$db->setQuery($matchupqas);
		$matchupqasresults = $db->loadObjectList();
		$matchupqasresult = $matchupqasresults[0];

		$matchupqascover = $matchupqasresult->cover;
		$matchupqasdescription = $matchupqasresult->description;
		$matchupqastitle = $matchupqasresult->title;
		$matchupqasuserid = $matchupqasresult->userid;
		$matchupqasqid = $matchupqasresult->qid;

		$response['matchupqas'][$mtchupsid] = array('matchupqascover' => $matchupqascover, 'matchupqasdescription' => $matchupqasdescription, 'matchupqastitle' => $matchupqastitle, 'matchupqasuserid' => $matchupqasuserid, 'matchupqasqid' => $matchupqasqid);
	}

	echo json_encode($response);
	exit;
}

function notifications($loginid) {
	$db =& JFactory::getDBO();
	$query = $db->getQuery(true);
	$published = 1;
	$response = array();

	$notifications = 'SELECT * FROM `#__iconnect_notifications` WHERE '.$db->quoteName('content').' = "0" AND '.$db->quoteName('target').' = '.$db->quote($loginid).' AND '.$db->quoteName('uid').' != '.$db->quote($loginid).' ORDER BY '.$db->quoteName('id').' DESC';
	$db->setQuery($notifications);	
	$notificationsresults = $db->loadObjectList();

	if (count($notificationsresults) == 0){
		$response['notification']['0'] = "0";
	}
	
	foreach ($notificationsresults as $key => $notificationresult) {

		$notistatus = $notificationresult->status;

		if($notistatus == '2') {
			$mynoticontent = JText::_('would like to be your friend');			
		}
		if($notistatus == '3') {
			$mynoticontent = JText::_('accepted your friend request');			
		}
		if($notistatus == '4') {
			$mynoticontent = JText::_('is now following you');			
		}
		if($notistatus == '5') {
			$mynoticontent = JText::_('added you to circle');			
		}
		if($notistatus == '6') {
			$mynoticontent = JText::_('requested to join your circle');			
		}
		if($notistatus == '7') {
			$mynoticontent = JText::_('sent you a private message');			
		}
		if($notistatus == '8') {
			$mynoticontent = JText::_('liked your profile');			
		}
		if($notistatus == '9') {
			$mynoticontent = JText::_('liked your post');			
		}
		if($notistatus == '10') {
			$mynoticontent = JText::_('added you to favorites');			
		}
		if($notistatus == '11') {
			$mynoticontent = JText::_('added your post to favorites');			
		}
		if($notistatus == '12') {
			$mynoticontent = JText::_('commented your profile');			
		}
		if($notistatus == '13') {
			$mynoticontent = JText::_('commented your post');			
		}
		if($notistatus == '14') {
			$mynoticontent = JText::_('shared your profile');			
		}
		if($notistatus == '15') {
			$mynoticontent = JText::_('shared your post');			
		}
		if($notistatus == '16') {
			$mynoticontent = JText::_('Your profile has been featured!');			
		}
		if($notistatus == '17') {
			$mynoticontent = JText::_('Your post has been featured!');			
		}
		if($notistatus == '18') {
			$mynoticontent = JText::_('mentioned you in a post');			
		}
		if($notistatus == '19') {
			$mynoticontent = JText::_('invited you to an event');			
		}
		if($notistatus == '20') {
			$mynoticontent = JText::_('invited you to chat');			
		}
		if($notistatus == '21') {
			$mynoticontent = JText::_('entered your chatroom');			
		}
		if($notistatus == '22') {
			$mynoticontent = JText::_('just paid token for your chatroom');			
		}
		if($notistatus == '23') {
			$mynoticontent = JText::_('just paid access to your');			
		}
		if($notistatus == '24') {
			$mynoticontent = JText::_('sent you a gift');			
		}
		if($notistatus == '25') {
			$mynoticontent = JText::_('just wrote on your wall');			
		}
		if($notistatus == '26') {
			$mynoticontent = JText::_('joined your circle');			
		}
		if($notistatus == '27') {
			$mynoticontent = JText::_('is waiting for you now in chatroom');			
		}
		if($notistatus == '28') {
			$mynoticontent = JText::_('You have an update on Reported content');			
		}


		$notiid = $notificationresult->id;
		$notiuid = $notificationresult->uid;
		$notitarget = $notificationresult->target;
		$notitype = $notificationresult->type;

		$notificationsusers = 'SELECT * FROM `#__iconnect_profiles` WHERE userid ="'.$notiuid.'"';
		$db->setQuery($notificationsusers);
		$notificationuserdata = $db->loadObjectList();
		$notificationuser  = $notificationuserdata[0];

		$notiiname = $notificationuser->iname;
		$notifullname = $notificationuser->fullname;
		$notiavatar = $notificationuser->avatar;
		$notithumb = $notificationuser->thumb;

		$response['notification'][$notiid] = array('notiid' => $notiid, 'notiuid' => $notiuid, 'notitarget' => $notitarget, 'notitype' => $notitype, 'notiiname' => $notiiname, 'notifullname' => $notifullname, 'notiavatar' => $notiavatar, 'notithumb' => $notithumb, 'mynoticontent' => $mynoticontent);

	}

	$lastidquery = 'SELECT id FROM `#__iconnect_notifications` ORDER BY id DESC LIMIT 1';
	$db->setQuery($lastidquery);
	$lastid = $db->loadObjectList();
	$response['total'] = $lastid['0'];
	 
	echo json_encode($response);
	exit;
}

function readnotifications($loginid, $notiid) {
	$db =& JFactory::getDBO();
	$query = $db->getQuery(true);
	$published = 1;

	$query = "UPDATE #__iconnect_notifications SET content= '1' WHERE id='".$notiid."'";
	
	$db->setQuery($query);
	$db->query();

	notifications($loginid);
}

function countnotifications($loginid) {
	$db =& JFactory::getDBO();
	$query = $db->getQuery(true);
	$published = 1;
	$response = array();

	$countnoti = 'SELECT * FROM `#__iconnect_notifications` WHERE '.$db->quoteName('content').' = "0" AND '.$db->quoteName('target').' = '.$db->quote($loginid).' AND '.$db->quoteName('uid').' != '.$db->quote($loginid).' ORDER BY '.$db->quoteName('id').' DESC';
	$db->setQuery($countnoti);	
	$db->query();
	$totalnoti = $db->getNumRows();

	$response['totalnoti'] = $totalnoti;
	 
	echo json_encode($response);
	exit;
}

function mailbox($loginid) {
	$db =& JFactory::getDBO();
	$query = $db->getQuery(true);
	$published = 1;
	$response = array();

	$countmzg = 'SELECT * FROM `#__iconnect_message_status` WHERE '.$db->quoteName('uid').' = '.$db->quote($loginid).' ORDER BY '.$db->quoteName('id').' DESC';
	$db->setQuery($countmzg);
	$countmzgsresults = $db->loadObjectList();
	
	foreach ($countmzgsresults as $countmzgresult) {
		$msgtableid = $countmzgresult->id;
		$msgid = $countmzgresult->msgid;
		$msgstatus = $countmzgresult->status;

		$mzg = 'SELECT * FROM `#__iconnect_messages` WHERE '.$db->quoteName('id').' = '.$db->quote($msgid).' AND '.$db->quoteName('touserid').' = '.$db->quote($loginid).' ORDER BY '.$db->quoteName('id').' DESC';
		$db->setQuery($mzg);
		$mzgresults = $db->loadObjectList();

		$photoData= explode(",", str_replace('ext:', '', str_replace('}', '', str_replace('{file:', '', str_replace('thumb:', '', str_replace('"', '', $mzgresults[0]->attch)))))); 

		$parentid = $mzgresults[0]->parentid;
        $fromuserid = $mzgresults[0]->fromuserid;
        $filecover = $photoData[0];
        $extension = $photoData[1];
        $filethumb = $photoData[2]; 
        $subject = $mzgresults[0]->subject;
        $msg = $mzgresults[0]->msg;
        $tags = $mzgresults[0]->tags;
        $hashtags = $mzgresults[0]->hashtags;
        $mentions = $mzgresults[0]->mentions;
        $status = $mzgresults[0]->status;
        // $msgdate = date_format(date_create($mzgresults[0]->date), 'D M j G:ia T Y');
        $msgdate = date_format(date_create($mzgresults[0]->date), 'D M j G:ia T');
        $cid = $mzgresults[0]->cid;
        $cidtype = $mzgresults[0]->cidtype;
		$mzgtxt = implode(' ', array_slice(explode(' ', $msg), 0, 3));

		$user = 'SELECT * FROM `#__iconnect_profiles` WHERE '.$db->quoteName('userid').' = '.$db->quote($fromuserid).' ORDER BY '.$db->quoteName('id').' DESC';
		$db->setQuery($user);
		$userresults = $db->loadObjectList();

		$useriname = $userresults[0]->iname;
		$userfullname = $userresults[0]->fullname;
		$useravatar = $userresults[0]->avatar;
		$userheader = $userresults[0]->header;
		$userthumb = $userresults[0]->thumb;

		$response['messages'][$msgtableid] = array('msgid' => $msgid, 'msgstatus' => $msgstatus, 'parentid' => $parentid, 'fromuserid' => $fromuserid, 'filecover' => $filecover, 'filethumb' => $filethumb, 'subject' => $subject, 'msg' => $msg, 'tags' => $tags, 'hashtags' => $hashtags, 'mentions' => $mentions, 'status' => $status, 'date' => $msgdate, 'cid' => $cid, 'cidtype' => $cidtype, 'mzgtxt' => $mzgtxt, 'useriname' => $useriname, 'userfullname' => $userfullname, 'useravatar' => $useravatar, 'userheader' => $userheader, 'userthumb' => $userthumb);	
	}
	$lastidquery = 'SELECT id FROM `#__iconnect_message_status` ORDER BY id DESC LIMIT 1';
	$db->setQuery($lastidquery);
	$lastid = $db->loadObjectList();
	$response['total'] = $lastid['0'];
	 
	echo json_encode($response);
	exit;
	
}

function setpriority($loginid, $msgid, $priority) {
	$db =& JFactory::getDBO();
	$query = $db->getQuery(true);

	if($priority == 1 || $priority == 2) {
		$query = "UPDATE #__iconnect_message_status SET status= '3' WHERE uid='".$loginid."' AND msgid = '".$msgid."'";
	}
	if($priority == 3) {
		$query = "UPDATE #__iconnect_message_status SET status= '2' WHERE uid='".$loginid."' AND msgid = '".$msgid."'";
	}
	
	$db->setQuery($query);
	$db->query();

	mailbox($loginid);

}

function viewmessage($loginid, $msgid, $fromuserid) {

	$db =& JFactory::getDBO();
	$query = $db->getQuery(true);
	$published = 1;
	$response = array();

	$mzg = 'SELECT * FROM `#__iconnect_messages` WHERE '.$db->quoteName('id').' = '.$db->quote($msgid).' AND '.$db->quoteName('touserid').' = '.$db->quote($loginid).' ORDER BY '.$db->quoteName('id').' DESC';
	$db->setQuery($mzg);
	$mzgresults = $db->loadObjectList();

	$photoData= explode(",", str_replace('ext:', '', str_replace('}', '', str_replace('{file:', '', str_replace('thumb:', '', str_replace('"', '', $mzgresults[0]->attch)))))); 

	$parentid = $mzgresults[0]->parentid;
    $fromuserid = $mzgresults[0]->fromuserid;
    $filecover = $photoData[0];
    $extension = $photoData[1];
    $filethumb = $photoData[2]; 
    $subject = $mzgresults[0]->subject;
    $msg = $mzgresults[0]->msg;
    $tags = $mzgresults[0]->tags;
    $hashtags = $mzgresults[0]->hashtags;
    $mentions = $mzgresults[0]->mentions;
    $status = $mzgresults[0]->status;
    // $msgdate = date_format(date_create($mzgresults[0]->date), 'D M j G:ia T Y');
    $msgdate = date_format(date_create($mzgresults[0]->date), 'D M j G:ia T');
    $cid = $mzgresults[0]->cid;
    $cidtype = $mzgresults[0]->cidtype;
	$mzgtxt = implode(' ', array_slice(explode(' ', $msg), 0, 3));

	$user = 'SELECT * FROM `#__iconnect_profiles` WHERE '.$db->quoteName('userid').' = '.$db->quote($fromuserid).' ORDER BY '.$db->quoteName('id').' DESC';
	$db->setQuery($user);
	$userresults = $db->loadObjectList();

	$useriname = $userresults[0]->iname;
	$userfullname = $userresults[0]->fullname;
	$useravatar = $userresults[0]->avatar;
	$userheader = $userresults[0]->header;
	$userthumb = $userresults[0]->thumb;

	$loginuser = 'SELECT * FROM `#__iconnect_profiles` WHERE '.$db->quoteName('userid').' = '.$db->quote($loginid).' ORDER BY '.$db->quoteName('id').' DESC';
	$db->setQuery($loginuser);
	$loggeduserresults = $db->loadObjectList();

	$loggeduseriname = $loggeduserresults[0]->iname;
	$loggeduserfullname = $loggeduserresults[0]->fullname;
	$loggeduseravatar = $loggeduserresults[0]->avatar;
	$loggeduserheader = $loggeduserresults[0]->header;
	$loggeduserthumb = $loggeduserresults[0]->thumb;

	$response['messages'] = array('msgid' => $msgid, 'msgstatus' => $msgstatus, 'parentid' => $parentid, 'fromuserid' => $fromuserid, 'filecover' => $filecover, 'filethumb' => $filethumb, 'subject' => $subject, 'msg' => $msg, 'tags' => $tags, 'hashtags' => $hashtags, 'mentions' => $mentions, 'status' => $status, 'date' => $msgdate, 'cid' => $cid, 'cidtype' => $cidtype, 'mzgtxt' => $mzgtxt, 'useriname' => $useriname, 'userfullname' => $userfullname, 'useravatar' => $useravatar, 'userheader' => $userheader, 'userthumb' => $userthumb, 'loggeduseriname' => $loggeduseriname, 'loggeduserfullname' => $loggeduserfullname, 'loggeduseravatar' => $loggeduseravatar, 'loggeduserthumb' => $loggeduserthumb);	

	echo json_encode($response);
	exit;
	
}

function sendmessage($loginid, $message, $touserid, $subject, $attch2, $date ) {
	
	$db =& JFactory::getDBO();
	$query = $db->getQuery(true);

	$attch1 = ltrim($attch2, '"');
	$attch = rtrim($attch1, '"');

	$query = "INSERT INTO #__iconnect_messages (parentid, fromuserid, touserid, attch, subject, msg, tags, hashtags, mentions, status, date, cid, cidtype) VALUES ('0','".$loginid."','".$touserid."', '".$attch."', '".$subject."', '".$message."', '', '', '', '0', '".$date."' , '0', '')";
	$db->setQuery($query);
	if($db->query()) {
		$msgid = $db->insertid();

		$query = "INSERT INTO #__iconnect_message_status (msgid, uid, status, date) VALUES ('".$msgid."','".$touserid."', '1', '".$date."')";
		$db->setQuery($query);

		if($db->query()) {
			$msgid = $db->insertid();

			$query = "INSERT INTO #__iconnect_notifications (uid, target, content, type, element, cid, status, created) VALUES ('".$loginid."','".$touserid."','0', 'info', '', '0', '7', '".$date."')";
			$db->setQuery($query);
			if ($db->query()) {
				echo "Success";
			}
			else {
				echo "Fail";
			}
		}
		else {
			echo "Fail";
		}
	}
	else {
		echo "Fail";
	}
	exit;
}

function previewmsg($loginid, $msgid, $msgstatusnum) {
	$db =& JFactory::getDBO();
	$query = $db->getQuery(true);

	$query = "UPDATE #__iconnect_message_status SET status= '2' WHERE uid='".$loginid."' AND msgid = '".$msgid."'";
	
	$db->setQuery($query);
	$db->query();

	mailbox($loginid);
}

function sendmainmessage($loginid, $message, $touserid, $subject, $attch2, $date) {
	$db =& JFactory::getDBO();
	$query = $db->getQuery(true);

	$attch1 = ltrim($attch2, '"');
	$attch = rtrim($attch1, '"');

	foreach ($touserid as $key => $receiver) {
		$sendmailto = $receiver['id'];

		$query = "INSERT INTO #__iconnect_messages (parentid, fromuserid, touserid, attch, subject, msg, tags, hashtags, mentions, status, date, cid, cidtype) VALUES ('0','".$loginid."','".$sendmailto."', '".$attch."', '".$subject."', '".$message."', '', '', '', '0', '".$date."' , '0', '')";
		$db->setQuery($query);
		if($db->query()) {
			$msgid = $db->insertid();

			$query = "INSERT INTO #__iconnect_message_status (msgid, uid, status, date) VALUES ('".$msgid."','".$sendmailto."', '1', '".$date."')";
			$db->setQuery($query);

			if($db->query()) {
				$msgid = $db->insertid();

				$query = "INSERT INTO #__iconnect_notifications (uid, target, content, type, element, cid, status, created) VALUES ('".$loginid."','".$sendmailto."','0', 'info', '', '0', '7', '".$date."')";
				$db->setQuery($query);
				if ($db->query()) {
					echo "Success";
				}
				else {
					echo "Fail";
				}
			}
			else {
				echo "Fail";
			}
		}
		else {
			echo "Fail";
		}
	}
	exit;
}

function searchusertosendmail($loginid, $search) {
	$db =& JFactory::getDBO();
	$query = $db->getQuery(true);
	$response = array();

	$search = '%'.$search.'%';
	$dbprofile = "SELECT * FROM `ic_iconnect_profiles` WHERE `fullname` LIKE '".$search."' LIMIT 0 , 30 ";
	
	$db->setQuery($dbprofile);
	$profileData = $db->loadObjectList();

    foreach ($profileData as $row) {
    	$userid = $row->userid;
    	$iname = $row->iname;
    	$fullname = $row->fullname;
    	if($row->thumb == "" || $row->thumb == null ){
            $thumb = "default-avatar.png";
        }
        else {
            $thumb = $userid . "/" . $row->thumb;
        }
    	$src = "http://qeneqt.us/images/icprofiles/".$thumb;
    	?>
        <div id=<?php echo $userid; ?> class="isfriend" ><a onclick="selectsender('<?php echo $userid ;?>','<?php echo $iname ;?>','<?php echo $fullname ;?>','<?php echo $thumb; ?>');" class="isendtousr" data-uid=<?php echo $userid; ?> ><img src=<?php echo $src; ?> ><span class="fname"><?php echo $fullname; ?> (@<?php echo $iname; ?>)</span><i class="icicon-envelope isfloatright"></i></a></div>

<?php
    }	
   	exit;	
}

function mzgimageupload($loginid, $date){

	$length = 35;
	$randomString = substr(str_shuffle("0123456789abcdefghijklmnopqrstuvwxyz"), 0, $length);
	$tmp_name = $_FILES['image']['tmp_name'];
	$ext = $_FILES['image']['type'];
	$new_image_name = $randomString."_".$_FILES['image']['name'];
	$dir = 'images/icmessages/'.$loginid;
	if( is_dir( $dir ) ) {
	    // echo "The Directory {$dir} exists";
	}
	else {
		mkdir($dir, 0777, true);
	}
	$path_to_file = $dir. '/'.$new_image_name;
	move_uploaded_file($tmp_name, $path_to_file);

	$photo = '{"file":"'.$new_image_name.'","ext":"'.$ext.'","thumb":"'.$new_image_name.'"}';

	echo $photo;

	exit;
} 

function likedislike($loginid, $cid, $date, $element) {
	$db =& JFactory::getDBO();
	$query = $db->getQuery(true);
	$published = '1';

	$likes = 'SELECT * FROM `#__iconnect_likes` WHERE `cid` ="'.$cid.'" AND `uid` = "'.$loginid.'" ORDER BY id DESC';
	$db->setQuery($likes);
	$postLike = $db->loadObjectList();
	$db->query();
	$like = $db->getNumRows();

	if($like == '0') {
		$query = "INSERT INTO #__iconnect_likes (`date`, `element`, `cid`, `uid`, `like`, `dislike` ) VALUES ('".$date."','".$element."', '".$cid."', '".$loginid."', '1', '0')";
		$db->setQuery($query);
		if($db->query()) {
			echo "Success";
		}
	}
	else {
		$likeid = $postLike['0']->id;
		$likestatus = $postLike['0']->like;
		if($likestatus == '0') {
			$dolike = "UPDATE #__iconnect_likes SET `like`= '1' WHERE id='".$likeid."'";
			
			$db->setQuery($dolike);
			if($db->query()) {
				echo "Success";
			}
		}
		if($likestatus == '1') {
			$dolike = "UPDATE #__iconnect_likes SET `like`= '0' WHERE id='".$likeid."'";
			$db->setQuery($dolike);
			if($db->query()) {
				echo "Success";
			}
		}
		
	}
	exit;
}

function docomments($loginid, $cid, $date, $element, $commentdes, $parentcid, $parentelement) {
	//echo $loginid.", <br/>".$cid.", <br/>".$date.", <br/>".$element.", <br/>".$commentdes.", <br/>".$parentcid.", <br/>".$parentelement;
	$db =& JFactory::getDBO();
	$query = $db->getQuery(true);
	$published = '1';

	if($commentdes != "" || $commentdes != null){
		$query = "INSERT INTO #__iconnect_comments (`uid`, `cid`, `element`, `parentcid`, `parentelement`, `comment`, `date`, `published`, `params`) VALUES ('".$loginid."','".$cid."', '".$element."', '".$parentcid."', '".$parentelement."','".$commentdes."', '".$date."', '1', '')";
		$db->setQuery($query);
		if($db->query()) {
			echo "Success";
		}
	}
	else {
		echo "Success";
	}
	exit;
}

function commentbox($loginid, $cid) {
	$db =& JFactory::getDBO();
	$query = $db->getQuery(true);
	$published = '1';
	$response = array();

	$query = 'SELECT * FROM `#__iconnect_comments` WHERE `cid` ="'.$cid.'" AND `published` = "'.$published.'" ORDER BY id DESC';
	$db->setQuery($query);
	$results = $db->loadObjectList();

	if (count($results) == 0){
		$response['comment']['0'] = "0";
	}

	foreach ($results as $key => $result) {
		$commentid = $result->id;
		$commentuid = $result->uid;
		$commentcid = $result->cid;
		$commentelement = $result->element;
		$commentparentcid = $result->parentcid;
		$commentparentelement = $result->parentelement;
		$commentcomment = $result->comment;
		$commentdate = $result->date;
		$commentpublished = $result->published;
		$commentparams = $result->params;

		$dbprofile = 'SELECT * FROM `#__iconnect_profiles` WHERE userid ='.$commentuid;
		$db->setQuery($dbprofile);
		$profileData = $db->loadObjectList();
		$response['profile'][$commentid] = $profileData[0];
		
		$likes = 'SELECT * FROM `#__iconnect_likes` WHERE `cid` ="'.$commentid.'" AND `like` = "1" ORDER BY id DESC';
		$db->setQuery($likes);
		$postLike = $db->loadObjectList();
		$db->query();
		$like = $db->getNumRows();
		
		$likeids = 'SELECT cid FROM `#__iconnect_likes` WHERE `uid` ="'.$loginid.'" AND `cid` = "'.$commentid.'" AND `like` = "1" ORDER BY id DESC';
		$db->setQuery($likeids);
		$commentLike = $db->loadObjectList();
		// echo "<pre>";
		// print_r($commentLike);

		$likecid = $commentLike[0]->cid;

		$response['comment'][$commentid] = array('commentid' => $commentid, 'commentuid' => $commentuid, 'commentcid' => $commentcid, 'commentelement' => $commentelement, 'commentparentcid' => $commentparentcid, 'commentparentelement' => $commentparentelement, 'commentcomment' => $commentcomment, 'commentdate' => $commentdate, 'commentpublished' => $commentpublished, 'commentparams' => $commentparams, 'commentlike' => $like, 'likecid' => $likecid);
	}
	$lastidquery = 'SELECT id FROM `#__iconnect_comments` ORDER BY id DESC LIMIT 1';

	$db->setQuery($lastidquery);
	$lastid = $db->loadObjectList();
	$response['total'] = $lastid['0'];

	echo json_encode($response);
	exit;
}

function delectehidecomment($loginid, $commentid, $commentoption, $cid) {
	$db =& JFactory::getDBO();
	$query = $db->getQuery(true);

	if($commentoption == 1){
		$conditions = array(
		    $db->quoteName('id') . ' = '. $db->quote($commentid)
		);
		 
		$query->delete($db->quoteName('#__iconnect_comments'));
		$query->where($conditions);
		$db->setQuery($query);	 
		$result = $db->execute();
		if($result) {
			commentbox($loginid, $cid);
		} 
	}
	else {
		$query = "UPDATE #__iconnect_comments SET `published`= '0' WHERE id='".$commentid."'";
		$db->setQuery($query);
		if($db->query()) {
			commentbox($loginid, $cid);
		}
	}
	exit;
}

function commentlike($loginid, $commentid, $commentuserid, $date, $element) {

	$db =& JFactory::getDBO();
	$query = $db->getQuery(true);
	$published = '1';

	$likes = 'SELECT * FROM `#__iconnect_likes` WHERE `cid` ="'.$commentid.'" AND `uid` = "'.$commentuserid.'" ORDER BY id DESC';
	$db->setQuery($likes);
	$postLike = $db->loadObjectList();
	$db->query();
	$like = $db->getNumRows();

	if($like == '0') {
		$query = "INSERT INTO #__iconnect_likes (`date`, `element`, `cid`, `uid`, `like`, `dislike` ) VALUES ('".$date."','".$element."', '".$commentid."', '".$loginid."', '1', '0')";
		$db->setQuery($query);
		if($db->query()) {
			echo "Success";
		}
	}
	else {
		$likeid = $postLike['0']->id;
		$likestatus = $postLike['0']->like;
		if($likestatus == '0') {
			$dolike = "UPDATE #__iconnect_likes SET `like`= '1' WHERE id='".$likeid."'";
			
			$db->setQuery($dolike);
			if($db->query()) {
				echo "Success";
			}
		}
		if($likestatus == '1') {
			$dolike = "UPDATE #__iconnect_likes SET `like`= '0' WHERE id='".$likeid."'";
			$db->setQuery($dolike);
			if($db->query()) {
				echo "Success";
			}
		}
		
	}
	exit;

}

function supportunsupport($loginid, $cid, $date, $element) {
	$db =& JFactory::getDBO();
	$query = $db->getQuery(true);
	$published = '1';

	$supports = 'SELECT * FROM `#__iconnect_support` WHERE `cid` ="'.$cid.'" AND `uid` = "'.$loginid.'" ORDER BY id DESC';
	$db->setQuery($supports);
	$postSupport = $db->loadObjectList();
	$db->query();
	$support = $db->getNumRows();

	if($support == '0') {
		$query = "INSERT INTO #__iconnect_support (`date`, `element`, `cid`, `uid`, `support` ) VALUES ('".$date."','".$element."', '".$cid."', '".$loginid."', '1')";
		$db->setQuery($query);
		if($db->query()) {
			echo "Success";
		}
	}
	else {
		$supportid = $postSupport['0']->id;
		$supportstatus = $postSupport['0']->support;
		if($supportstatus == '0') {
			$dosupport = "UPDATE #__iconnect_support SET `support`= '1' WHERE id='".$supportid."'";
			
			$db->setQuery($dosupport);
			if($db->query()) {
				echo "Success";
			}
		}
		if($supportstatus == '1') {
			$dosupport = "UPDATE #__iconnect_support SET `support`= '0' WHERE id='".$supportid."'";
			$db->setQuery($dosupport);
			if($db->query()) {
				echo "Success";
			}
		}
		
	}
	exit;
}

function followuser($loginid, $followuser, $date) {
	//echo $loginid."<br />".$followuser."<br />".$date;
	$db =& JFactory::getDBO();
	$query = $db->getQuery(true);
	$published = '1';

	$followes = 'SELECT * FROM `#__iconnect_followers` WHERE `user_id` ="'.$followuser.'" AND `follower_id` = "'.$loginid.'" ORDER BY id DESC';
	$db->setQuery($followes);
	$followesuser = $db->loadObjectList();
	$db->query();
	$follow = $db->getNumRows();

	//print_r($followesuser);

	if($follow == '0') {
		$query = "INSERT INTO #__iconnect_followers (`user_id`, `follower_id`, `status`) VALUES ('".$followuser."','".$loginid."', '".$published."')";
		$db->setQuery($query);
		if($db->query()) {
			$query = "INSERT INTO #__iconnect_notifications (uid, target, content, type, element, cid, status, created) VALUES ('".$loginid."','".$followuser."','0', 'info', '', '0', '4', '".$date."')";
			$db->setQuery($query);
			if ($db->query()) {
				echo "Follow";
			}
		}
	}
	else {
		$followid = $followesuser['0']->id;
		$followstatus = $followesuser['0']->status;
		if($followstatus == '0') {
			$userfollow = "UPDATE #__iconnect_followers SET `status`= '1' WHERE id='".$followid."'";
			
			$db->setQuery($userfollow);
			if($db->query()) {
				$query = "INSERT INTO #__iconnect_notifications (uid, target, content, type, element, cid, status, created) VALUES ('".$loginid."','".$followuser."','0', 'info', '', '0', '4', '".$date."')";
				$db->setQuery($query);
				if ($db->query()) {
					echo "Follow";
				}
			}
		}
		if($followstatus == '1') {
			$userfollow = "UPDATE #__iconnect_followers SET `status`= '0' WHERE id='".$followid."'";
			$db->setQuery($userfollow);
			if($db->query()) {
				echo "Unfollow";
			}
		}
	}
	exit;
}

function makefriend($loginid, $frienduser, $date) {
	//echo $loginid."<br />".$followuser."<br />".$date;
	$db =& JFactory::getDBO();
	$query = $db->getQuery(true);
	$published = '1';

	$friends = 'SELECT * FROM `#__iconnect_friends` WHERE `friend_id` ="'.$frienduser.'" AND `user_id` = "'.$loginid.'" ORDER BY id DESC';
	$db->setQuery($friends);
	$friendsuser = $db->loadObjectList();
	$db->query();
	$friend = $db->getNumRows();

	// print_r($friendsuser);

	if($friend == '0') {
		$query = "INSERT INTO #__iconnect_friends (`friend_id`, `user_id`, `status`) VALUES ('".$frienduser."','".$loginid."', '".$published."')";
		$db->setQuery($query);
		if($db->query()) {
			$query = "INSERT INTO #__iconnect_notifications (uid, target, content, type, element, cid, status, created) VALUES ('".$loginid."','".$followuser."','0', 'info', '', '0', '2', '".$date."')";
			$db->setQuery($query);
			if ($db->query()) {
				echo "friend";
			}
		}
	}
	else {
		$friendid = $friendsuser['0']->id;
		$friendstatus = $friendsuser['0']->status;
		if($friendstatus == '0') {
			$userfriend = "UPDATE #__iconnect_friends SET `status`= '1' WHERE id='".$friendid."'";
			
			$db->setQuery($userfriend);
			if($db->query()) {
				$query = "INSERT INTO #__iconnect_notifications (uid, target, content, type, element, cid, status, created) VALUES ('".$loginid."','".$followuser."','0', 'info', '', '0', '2', '".$date."')";
				$db->setQuery($query);
				if ($db->query()) {
					echo "friend";
				}
			}
		}
		if($friendstatus == '1') {
			$userfriend = "UPDATE #__iconnect_friends SET `status`= '0' WHERE id='".$friendid."'";
			$db->setQuery($userfriend);
			if($db->query()) {
				echo "Unfriend";
			}
		}
	}
	exit;
}

function loggedusercircles($loginid, $useraddtocircle) {

	$db = JFactory::getDbo();
	$query = $db->getQuery(true);
	$published = "1";


	$query = 'SELECT * FROM `#__iconnect_circles` WHERE `userid` = "'.$loginid.'" AND `published` = "'.$published.'" ORDER BY id DESC';
	$db->setQuery($query);
	$results = $db->loadObjectList();
	$db->query();
	$circles = $db->getNumRows();

	$response = array();

	foreach ($results as $key => $result) {

		$circleid= $result->id;
		$circleuserid= $result->userid;
		$circletitle= $result->title;
		$circlethumb= $result->thumb;
		$circletype= $result->type;

		$query = 'SELECT * FROM `#__iconnect_circle_access` WHERE `circleid` = "'.$circleid.'" AND `profileid` = "'.$useraddtocircle.'" ORDER BY id DESC';
		$db->setQuery($query);
		$total = $db->loadObjectList();
		$db->query();
		$useridtocircle = $db->getNumRows();

		$response['circles'][$circleid] = array('circleid' => $circleid, 'circleuserid' => $circleuserid, 'circletitle' => $circletitle, "circlethumb" => $circlethumb, 'circletype' => $circletype, 'useridtocircle' => $useridtocircle );

	}
	$lastidquery = 'SELECT id FROM `#__iconnect_circles` ORDER BY id DESC LIMIT 1';

	$db->setQuery($lastidquery);
	$lastid = $db->loadObjectList();
	$response['total'] = $lastid['0'];

	echo json_encode($response);
	exit;
}

function addusertocircle($loginid, $useraddtocircle, $circleid) {
	$db = JFactory::getDbo();
	$query = $db->getQuery(true);

	$query = 'SELECT * FROM `#__iconnect_circle_access` WHERE `circleid` = "'.$circleid.'" AND `profileid` = "'.$useraddtocircle.'" ORDER BY id DESC';
	$db->setQuery($query);
	$total = $db->loadObjectList();
	$db->query();
	$useridtocircle = $db->getNumRows();

	if($useridtocircle == 0){
		$query = "INSERT INTO #__iconnect_circle_access (circleid, profileid, status) VALUES ('".$circleid."','".$useraddtocircle."', '1')";
		$db->setQuery($query);
		if($db->query()){
			echo "success";
		}
	}
	else {

		$query = 'DELETE FROM `#__iconnect_circle_access` WHERE `circleid` = "'.$circleid.'" AND `profileid` = "'.$useraddtocircle.'"';

		$db->setQuery($query);
		if($db->query()){
			echo "success";
		}
	}
	exit;
 }

function touserdetails($loginid, $touserid) {
	$db = JFactory::getDbo();
	$query = $db->getQuery(true);

	$dbprofile = 'SELECT * FROM `#__iconnect_profiles` WHERE userid ='.$touserid;
	$db->setQuery($dbprofile);
	$profileData = $db->loadObjectList();
	
	$iname = $profileData[0]->iname;
	$thumb= $profileData[0]->thumb;
	$response = array('iname' => $iname, 'thumb' => $thumb);
	
	echo json_encode($response);
	exit;
}

function executeprivatemessage($loginid, $message, $touserid, $subject, $attch2, $date) {
	$db =& JFactory::getDBO();
	$query = $db->getQuery(true);

	$attch1 = ltrim($attch2, '"');
	$attch = rtrim($attch1, '"');

	$sendmailto = $touserid;

	$query = "INSERT INTO #__iconnect_messages (parentid, fromuserid, touserid, attch, subject, msg, tags, hashtags, mentions, status, date, cid, cidtype) VALUES ('0','".$loginid."','".$sendmailto."', '".$attch."', '".$subject."', '".$message."', '', '', '', '0', '".$date."' , '0', '')";
	$db->setQuery($query);
	if($db->query()) {
		$msgid = $db->insertid();

		$query = "INSERT INTO #__iconnect_message_status (msgid, uid, status, date) VALUES ('".$msgid."','".$sendmailto."', '1', '".$date."')";
		$db->setQuery($query);

		if($db->query()) {
			$msgid = $db->insertid();

			$query = "INSERT INTO #__iconnect_notifications (uid, target, content, type, element, cid, status, created) VALUES ('".$loginid."','".$sendmailto."','0', 'info', '', '0', '7', '".$date."')";
			$db->setQuery($query);
			if ($db->query()) {
				echo "Success";
			}
			else {
				echo "Fail";
			}
		}
		else {
			echo "Fail";
		}
	}
	else {
		echo "Fail";
	}

	exit;
}

function updateStatus($loginid, $statusupdate, $date) {
	
	$db =& JFactory::getDBO();
	$query = $db->getQuery(true);

	$query = "INSERT INTO `#__iconnect_status` (`catid`, `userid`, `acl`, `accesstype`, `accessfee`, `accesspreview`, `date`, `location`, `hashtags`, `mentions`, `text`, `published`, `featured`, `circleid`, `wallid`) VALUES ('0','".$loginid."','f0','0','0','','".$date."','','','','".$statusupdate."','1','0','0','0')";
	$db->setQuery($query);

	if ($db->query()) {
		echo "Success";
	}
	else {
		echo "Fail";
	}

	exit;	 
}

function shareit($loginid, $postid) {
	$db =& JFactory::getDBO();
	$query = $db->getQuery(true);

	$loggedprofiles = 'SELECT `iname`, `fullname` FROM `#__iconnect_profiles` WHERE `userid` ='.$loginid;
	$db->setQuery($loggedprofiles);
	$loggedprofile = $db->loadObjectList();
	$db->query();

	$response["loggeduserdetails"] = array('iname' => $loggedprofile['0']->iname, 'fullname' => $loggedprofile['0']->fullname, 'userid' => $loginid);

	$activities = 'SELECT * FROM `#__iconnect_activities` WHERE `id` ='.$postid;
	$db->setQuery($activities);
	$activity = $db->loadObjectList();
	$db->query();

	foreach ($activity as $result) {
		$response["datatype"] = array('posttype' => $result->type);
		$postuser_id = $result->user_id;
		$postcid = $result->cid;

		$profiles = 'SELECT `iname`, `fullname` FROM `#__iconnect_profiles` WHERE `userid` ='.$postuser_id;
		$db->setQuery($profiles);
		$profile = $db->loadObjectList();
		$db->query();

		if($result->type == "photos" && $result->action =="posted")
		{
			$photos = 'SELECT * FROM `#__iconnect_photos` WHERE `id` ='.$postcid;
			$db->setQuery($photos);
			$photo = $db->loadObjectList();
			$db->query();
			$dephoto = json_decode($photo['0']->photo);
			$postphoto = $dephoto->photo;

			$response["postphoto"] = array('postphoto' => $postphoto );
		}
		else if($result->type == "circle" && $result->action =="posted")
		{
			$circles = 'SELECT * FROM `#__iconnect_circles` WHERE `id` ='.$postcid;
			$db->setQuery($circles);
			$circle = $db->loadObjectList();
			$db->query();
			$cover = $circle['0']->cover;

			$response["postphoto"] = array('postphoto' => $cover );
		}
		else if($result->type == "profile" && ($result->action =="newcover" || $result->action =="newavatar" || $result->action =="newprofile"))
		{
			$postprofiles = 'SELECT * FROM `#__iconnect_profiles` WHERE `userid` ='.$postuser_id;
			$db->setQuery($postprofiles);
			$postprofile = $db->loadObjectList();
			$db->query();
			$header = $postprofile['0']->header;
			
			$response["postphoto"] = array('postphoto' => $header );

		}
		else if(($result->type == "localvideo" || $result->type == "video" ) && $result->action =="posted")
		{
			$postvideos = 'SELECT * FROM `#__iconnect_videos` WHERE `id` ='.$postcid;
			$db->setQuery($postvideos);
			$postvideo = $db->loadObjectList();
			$db->query();
			$dephoto = json_decode($postvideo['0']->video);
			$photo = $dephoto->image;			

			$response["postphoto"] = array('postphoto' => $photo ); 
		}
		else if($result->type == "link" && $result->action =="posted")
		{
			$postlinks = 'SELECT * FROM `#__iconnect_links` WHERE `id` ='.$postcid;
			$db->setQuery($postlinks);
			$postlink = $db->loadObjectList();
			$db->query();
			$dephoto = json_decode($postlink['0']->link);
			$photo = $dephoto->image;

			$response["postphoto"] = array('postphoto' => $photo ); 
		}
		else if($result->type == "board" && $result->action =="posted")
		{
			$postboards = 'SELECT * FROM `#__iconnect_boards` WHERE `id` ='.$postcid;
			$db->setQuery($postboards);
			$postboard = $db->loadObjectList();
			$db->query();
			$photo = json_decode($postboard['0']->cover);

			$response["postphoto"] = array('postphoto' => $photo ); 

		}
		else
		{
			$poststatuses = 'SELECT * FROM `#__iconnect_status` WHERE `id` ='.$postcid;
			$db->setQuery($poststatuses);
			$poststatus = $db->loadObjectList();
			$db->query();
			$photo = $poststatus['0']->text;

			$response["postphoto"] = array('postphoto' => $photo ); 

		}


		$response["postuserdetails"] = array('iname' => $profile['0']->iname, 'fullname' => $profile['0']->fullname, 'userid' => $postuser_id);
		
	}

	echo json_encode($response);
	exit;
}

function shareitnow($loginid, $postid, $checkedvalue, $sharetext, $date) {
	$db =& JFactory::getDBO();
	$query = $db->getQuery(true);
	$published = "1";

	$activities = 'SELECT * FROM `#__iconnect_activities` WHERE `id` ='.$postid;
	$db->setQuery($activities);
	$activity = $db->loadObjectList();
	$db->query();

	$postuserid = $activity[0]->user_id;
	$posttype = $activity[0]->type;
	$postcid = $activity[0]->cid;

	if($checkedvalue == "1") {
		
		$query0 = "INSERT INTO #__iconnect_activities (`user_id`, `published`, `type`, `action`, `item`, `location`, `acl`, `cid`, `date`, `accesstype`, `accesspreview`, `text`, `hashtags`, `circleid`, `wallid`) VALUES ('".$loginid."','".$published."','".$posttype."', 'shared', '', '', 'f0', '".$postcid."', '".$date."', '0', '', '".$sharetext."', '', '0', '0')";
			$db->setQuery($query0);
			if($db->query()) {
				echo "success";
			}
	}

	if($checkedvalue == "2") {
		
		$query0 = "INSERT INTO #__iconnect_activities (`user_id`, `published`, `type`, `action`, `item`, `location`, `acl`, `cid`, `date`, `accesstype`, `accesspreview`, `text`, `hashtags`, `circleid`, `wallid`) VALUES ('".$loginid."','".$published."','".$posttype."', 'shared', '', '', 'u".$postuserid."', '".$postcid."', '".$date."', '0', '', '".$sharetext."', '', '0', '".$postuserid."')";
			$db->setQuery($query0);
			if($db->query()) {
				echo "success";
			}
	}

	if($checkedvalue == "3") {
		echo "<br /><br />3".$sharetext;
	}
	exit;
}