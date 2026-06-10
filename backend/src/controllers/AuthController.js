import Lead from "../modules/LeadModules.js";
import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';



// Create a new lead
const createLead = async (req, res) => {
    try {
        const { name, email, password, status, source } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Name, email, and password are required' });
        }
        if (await Lead.findOne({ email })) {
            return res.status(400).json({ message: 'Lead with this email already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newLead = await Lead.create({
             name, 
             email, 
             password: hashedPassword,
             status, 
             source 
        });
        const token = jwt.sign({ id: newLead._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.cookie('token', token, {
             httpOnly: true, 
             secure: process.env.NODE_ENV === 'production',
             sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'strict',
             maxAge: 3600000
        });
        res.status(201).json({
            success: true, 
            token, 
            message: 'Lead created successfully'
           
        });

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

//login lead
const loginLead = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }
        const lead = await Lead.findOne({ email });
        if (!lead) {
            return res.status(400).json({ message: 'Invalid email ' });
        }
        const isMatch = await bcrypt.compare(password, lead.password);
        
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid  password' });
        }
        const token = jwt.sign({ id: lead._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.cookie('token', token, {
             httpOnly: true,
             secure: process.env.NODE_ENV === 'production',
             sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'strict',
             maxAge: 3600000
        });
        res.status(200).json({
            success: true, 
            token, 
            message: 'Lead logged in successfully',
            lead
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// Get leads
const getLeads = async (req, res) => {
    try {
        const leads = await Lead.find();
        res.status(200).json({
            success: true,
            leads,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
// Update lead
const updateLead = async (req, res) => {
    try {
        const { id } = req.params;
        const lead = await Lead.findById(id);
    
        if (!lead) {
            return res.status(404).json({ message: 'Lead not found' });
        }
        if (req.body.password && req.body.password.trim() !== "") {
             req.body.password = await bcrypt.hash(req.body.password, 10);
        } else {
           // keep old password if not updating
            req.body.password = lead.password;
        }

        const updatedLead = await Lead.findByIdAndUpdate(
            id, {
            name: req.body.name ,
            email: req.body.email,
            status: req.body.status,
            source: req.body.source , 
            }, { returnDocument: 'after', runValidators: true})
         if (!updatedLead) {
            return res.status(404).json({ message: 'Lead not found' });
        }
        res.status(200).json({
            success: true,
            message: 'Lead updated successfully',
            lead : updatedLead
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Delete lead
const deleteLead = async (req, res) => {
    try {
        const { id } = req.params;
        const lead = await Lead.findById(id);
        if (!lead) {
            return res.status(404).json({ message: 'Lead not found' });
        }
        await Lead.findByIdAndDelete(id);
        res.status(200).json({
            success: true,
            message: 'Lead deleted successfully'
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

//get lead one
const getLead = async (req, res) => {
    try {       
        const lead = await Lead.findById(req.params.id);
        console.log("Lead data:", lead);
        if (!lead) {
            return res.status(404).json({ message: 'Lead not found' });
        }
        res.status(200).json({
            success: true,
            lead
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

//get lead by id
const getLeadById = async (req, res) => {
    try {
       const {id} = req.params
        const lead = await Lead.findById(id);
        if (!lead) {
            return res.status(404).json({ message: 'Lead not found' });
        }
        res.status(200).json({
            success: true,
            lead
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const Logout = async (req, res) => {
    try{
        res.clearCookie("token",
            { httpOnly: true, 
             secure: process.env.NODE_ENV === 'production',
             sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'strict',  
            })
            res.status(200).json({message: "Logout seccessfull complated"})
    }catch(error){
        console.error("logout error", error);
        
        res.status(500).json({ message: error.message });
    }
    
}

// Filter leads by status and source
const filterLeads = async (req, res) => {
    try {
        const { status, source, search, sort } = req.query;

        let filter = {};
        if (status) {
            filter.status = status;
        }
        if (source) {
            filter.source = source;
        }
        if (search) {
            filter.$or = [
                { name: { $regex: search, $options: 'i' } },
                { email: { $regex: search, $options: 'i' } },
                { status: { $regex: search, $options: 'i' } },   
                { source: { $regex: search, $options: 'i' } }  
            ];
        }
        let sortOption = {};
        if (sort === 'newest') {
            sortOption.createdAt = -1;
        } else if (sort === 'oldest') {
            sortOption.createdAt = 1;
        }
        const leads = await Lead.find(filter).sort(sortOption);
        res.status(200).json({
            success: true,
            leads
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export {
    createLead,
    loginLead,
    getLeads,
    updateLead,
    deleteLead,
    getLeadById,
    Logout,
    getLead,
    filterLeads
}