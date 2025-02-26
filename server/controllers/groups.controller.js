const validationResult = require("express-validator");
const mongoose = require("mongoose");
const SupportGroup = require("../models/group.models");
const User = require('../models/user.model')

const createGroup = async (req, res, next) => {
  try {
    const { name, description, maxMembers, schedule, userId } = req.body;

    // Validate required fields
    if (!name || !userId) {
      return res.status(400).json({
        success: false,
        message: "Group name and user ID are required",
      });
    }
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID format",
      });
    }

    const userExists = await User.findById(userId);
    if (!userExists) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }

    const existGroup = await SupportGroup.exists({ name });
    if (existGroup) {
      return res.status(400).json({ message: "Group already exists" });
    }
    // Validate user ID format

    const newGroup = new SupportGroup({
      name,
      description,
      maxMembers,
      schedule,
      members: [userId],
    });

    const savedGroup = await newGroup.save();

    // Populate initial member details
    try {
      await savedGroup.populate("members", "name email");
    } catch (populateError) {
      return res.status(500).json({
        success: false,
        message: "Error populating group members",
      });
    }

    res.status(201).json({
      success: true,
      message: "Group created",
      group: savedGroup,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getGroups = async (req, res, next) => {
  try {
    const groups = await SupportGroup.find({ isActive: true })
      .populate("members", "name email")
      .populate("discussionTopics.createdBy", "name");

    return res.status(200).json({ message: "All groups fetched", groups });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ message: "Server error" });
  }
};

const joinGroup = async (req, res, next) => {
  try {
    const { id: groupId } = req.params;
    const { userId } = req.body;

    // Validate IDs
    if (!mongoose.Types.ObjectId.isValid(groupId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid group ID",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID",
      });
    }

    const group = await SupportGroup.findById(groupId);

    if (!group) {
      return res.status(404).json({
        success: false,
        message: "Group not found",
      });
    }

    if (!group.isActive) {
      return res.status(400).json({
        success: false,
        message: "This group is not active",
      });
    }

    // Check if user is already a member
    const isMember = group.members.some((memberId) =>
      memberId.equals(new mongoose.Types.ObjectId(userId))
    );

    if (isMember) {
      return res.status(400).json({
        success: false,
        message: "User is already a member of this group",
      });
    }

    // Check group capacity
    if (group.members.length >= group.maxMembers) {
      return res.status(400).json({
        success: false,
        message: "This group has reached maximum capacity",
      });
    }

    // Add user to group
    group.members.push(userId);
    const updatedGroup = await group.save();

    // Populate member details in response
    await updatedGroup.populate({
      path: "members",
      select: "name email",
    });

    res.json({
      success: true,
      message: "Successfully joined group",
      group: updatedGroup,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { createGroup, getGroups, joinGroup };
